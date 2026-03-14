const toteContents = document.querySelector('#toteContents')
const itemsTotal = document.querySelector('#itemsTotal')
const shippingTotal = document.querySelector('#shippingTotal')
const grandTotal = document.querySelector('#grandTotal')
const viewTote = document.querySelector('#viewTote')
const orderStatus = document.querySelector('#orderStatus')

let totalPrice = 0
let shippingPrice = 0
let tote = []

window.addEventListener('load', async (event) => {
    //Hide tote link
    viewTote.style.visibility = 'hidden'
    //Pull in all files #TODO change this to five random images
    let totePics = JSON.parse(localStorage.getItem('totePics'))

    const baseUrl = '/images/find/'

    totePics.forEach(async (picId) => {
        var url = baseUrl + picId
        var resp = await fetch(url)
        var data = await resp.json()

        tote[data._id] = data

        totalPrice += data.price
        var itemDiv = document.createElement('div')
        itemDiv.className = 'item_' + data._id

        var imgDiv = document.createElement('div')
        imgDiv.id = 'img_' + data._id

        var imgNode = document.createElement('img')
        imgNode.id = 'pic_' + data._id
        imgNode.className = 'loader'
        imgNode.src = data.path

        var pDiv = document.createElement('div')
        pDiv.className = 'imgP_' + data._id

        var imgPName = document.createElement('p')
        imgPName.className = 'cfText'
        var imgPWidth = document.createElement('p')
        imgPWidth.className = 'cfText'
        var imgPHeight = document.createElement('p')
        imgPHeight.className = 'cfText'
        var imgPPrice = document.createElement('p')
        imgPPrice.className = 'cfText'

        imgPName.innerHTML += 'Name: ' + data.name
        imgPWidth.innerHTML += 'Width: ' + data.width + '\'\''
        imgPHeight.innerHTML += 'Height ' + data.height + '\'\''
        imgPPrice.innerHTML += 'Price $' + data.price + ' USD'

        imgDiv.appendChild(imgNode)

        pDiv.appendChild(imgPName)
        pDiv.appendChild(imgPWidth)
        pDiv.appendChild(imgPHeight)
        pDiv.appendChild(imgPPrice)

        removeP = document.createElement('p')
        removeP.className = 'removeLink'
        removeLink = document.createElement('a')
        removeLink.id = 'remove_' + data._id
        removeLink.innerHTML = 'Remove Item'
        removeLink.href = 'javascript:void(0)'
        removeLink.addEventListener('click', removeItem)
        removeP.appendChild(removeLink)

        itemDiv.appendChild(imgDiv)
        itemDiv.appendChild(pDiv)
        itemDiv.appendChild(removeP)

        toteContents.appendChild(itemDiv)

        updateTotal(totalPrice, shippingPrice)
    })
})

const updateTotal = (tote, shipping) => {
    itemsTotal.innerHTML = 'Tote Total: $' + Number((tote).toFixed(2)) + ' USD'
    shippingTotal.innerHTML = 'Shipping: $' + Number((shipping).toFixed(1)) + ' USD'
    grandTotal.innerHTML = 'Final cost: $' + Number((tote + shipping).toFixed(1)) + ' USD'
}

const removeItem = (event) => {
    //Remove item from DOM
    let id = event.srcElement.id.replace('remove_', '')

    const removeDiv = document.querySelector('.item_' + id)
    removeDiv.remove()
    // Remove from tote and update Total
    let totePics = JSON.parse(localStorage.getItem('totePics'))
    let index = totePics.indexOf(id)
    totePics.splice(index, 1)
    localStorage.setItem('totePics', JSON.stringify(totePics))

    totalPrice = totalPrice - tote[id].price
    updateTotal(totalPrice, shippingPrice)
}

window.paypal
  .Buttons({
    style: {
      shape: "rect",
      layout: "vertical",
      color: "gold",
      label: "paypal",
    },
    message: {
      amount: 100,
    },

    async createOrder() {
      try {
        let children = toteContents.children
        let cart = []
        for (let child of children) {
            let id = child.className.replace('item_', '')
            let item = {}
            item.id = id
            item.quantity = 1
            item.price = tote[id].price
            cart.push(item)
        }
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // use the "body" param to optionally pass additional order information
          // like product ids and quantities
          body: JSON.stringify({
            cart: cart
          }),
        });

        const orderData = await response.json();

        if (orderData.id) {
          return orderData.id;
        }
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      } catch (error) {
        resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
      }
    },

    async onApprove(data, actions) {
      try {
        const response = await fetch(`/api/orders/${data.orderID}/capture`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const orderData = await response.json();
        // Three cases to handle:
        //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        //   (2) Other non-recoverable errors -> Show a failure message
        //   (3) Successful transaction -> Show confirmation or thank you message

        const errorDetail = orderData?.details?.[0];

        if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
          // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          // recoverable state, per
          // https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
          return actions.restart();
        } else if (errorDetail) {
          // (2) Other non-recoverable errors -> Show a failure message
          throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
        } else if (!orderData.purchase_units) {
          throw new Error(JSON.stringify(orderData));
        } else {
          // (3) Successful transaction -> Show confirmation or thank you message
          // Or go to another URL:  actions.redirect('thank_you.html');
          const transaction =
            orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
            orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
          resultMessage(
            `Transaction ${transaction.status}`
          );

          const newOrder = await fetch('/newOrder', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(orderData)
          })

          if (newOrder.status == 201) {
              //Order success, empty tote.
              localStorage.setItem('totePics', JSON.stringify([]))
              orderStatus.innerHTML = 'Order Complete! You will be receiving an email with shipping details soon.'
              const res = await fetch('/sendOrderEmail/true', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
              })
          } else {
              //Some sort of error
              orderStatus.innerHTML = 'There was an error processing your order. We will be in touch to alleviate the issue.'
              const picError = await fetch('/images/error', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(orderData.purchase_units)
              })
              const res = await fetch('/sendOrderEmail/false', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(orderData)
              })
          }
        }
      } catch (error) {
        console.error('New order errored:')
        console.error(error);
        resultMessage(
          `Sorry, your transaction could not be processed...<br><br>${error}`
        );
      }
    },
  })
  .render("#paypal-button-container");

// Example function to show a result to the user. Your site's UI library can be used instead.
function resultMessage(message) {
  const container = document.querySelector("#result-message");
  container.innerHTML = message;
}
