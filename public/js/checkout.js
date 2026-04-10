const toteContents = document.querySelector('#toteContents')
const itemsTotal = document.querySelector('#itemsTotal')
const shippingTotal = document.querySelector('#shippingTotal')
const grandTotal = document.querySelector('#grandTotal')
const viewTote = document.querySelector('#viewTote')
const orderStatus = document.querySelector('#orderStatus')
const errorStatus = document.querySelector('#errorStatus')

let totalPrice = 0
let internalError = ''

let tote

let shipping
let shippingInfo

window.addEventListener('load', async (event) => {
    shippingInfo = getShippingInfo()
    shipping = shippingInfo.shipping
    //Hide tote link
    viewTote.style.visibility = 'hidden'

    let resp = await fetch('/images/findPics', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(getToteItems())
    })
    tote = await resp.json()

    tote.forEach(async (pic) => {
        totalPrice += pic.price
        var itemDiv = document.createElement('div')
        itemDiv.className = 'item_' + pic._id

        var imgDiv = document.createElement('div')
        imgDiv.id = 'img_' + pic._id

        var imgNode = document.createElement('img')
        imgNode.id = 'pic_' + pic._id
        imgNode.className = 'loader'
        imgNode.src = pic.thumbnail

        var pDiv = document.createElement('div')
        pDiv.className = 'imgP_' + pic._id

        var imgPName = document.createElement('p')
        imgPName.className = 'cfText'
        var imgPWidth = document.createElement('p')
        imgPWidth.className = 'cfText'
        var imgPHeight = document.createElement('p')
        imgPHeight.className = 'cfText'
        var imgPPrice = document.createElement('p')
        imgPPrice.className = 'cfText'

        imgPName.innerHTML += 'Name: ' + pic.name
        imgPWidth.innerHTML += 'Width: ' + pic.width + '\'\''
        imgPHeight.innerHTML += 'Height ' + pic.height + '\'\''
        imgPPrice.innerHTML += 'Price $' + pic.price + ' USD'

        imgDiv.appendChild(imgNode)

        pDiv.appendChild(imgPName)
        pDiv.appendChild(imgPWidth)
        pDiv.appendChild(imgPHeight)
        pDiv.appendChild(imgPPrice)

        removeP = document.createElement('p')
        removeP.className = 'removeLink'
        removeLink = document.createElement('a')
        removeLink.id = 'remove_' + pic._id
        removeLink.innerHTML = 'Remove Item'
        removeLink.href = 'javascript:void(0)'
        removeLink.addEventListener('click', removeItem)
        removeP.appendChild(removeLink)

        itemDiv.appendChild(imgDiv)
        itemDiv.appendChild(pDiv)
        itemDiv.appendChild(removeP)

        toteContents.appendChild(itemDiv)

        updateTotal(totalPrice, shipping)
    })
})

const updateTotal = (tote, shipping) => {
    itemsTotal.innerHTML = 'Tote Total: $' + Number((tote).toFixed(2)) + ' USD'
    shippingTotal.innerHTML = 'Shipping: $' + Number(Number(shipping).toFixed(2)) + ' USD'
    grandTotal.innerHTML = 'Final cost: $' + Number((tote + Number(shipping)).toFixed(2)) + ' USD'
}

const removeItem = (event) => {
    //Remove item from DOM
    let id = event.srcElement.id.replace('remove_', '')

    const removeDiv = document.querySelector('.item_' + id)
    removeDiv.remove()
    // Remove from tote and update Total
    let totePics = getToteItems()
    let index = totePics.indexOf(id)
    totePics.splice(index, 1)
    setToteItem(totePics)

    tote.forEach((pic) => {
        if (pic._id == id) {
            totalPrice = totalPrice - pic.price
            updateTotal(totalPrice, shipping)
        }
    })

    tote = tote.filter(function(el) { return el._id != id })
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
        let cart = []
        tote.forEach((pic) => {
            let item = {}
            item.id = pic._id
            item.quantity = 1
            item.price = pic.price
            cart.push(item)
        })
        checkSoldErrored()
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
            shippingInfo: shippingInfo
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
              setToteItem([])
              orderStatus.innerHTML = 'Order Complete! You will be receiving an email with shipping details soon.'
              const res = await fetch('/sendOrderEmail/true', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(orderData)
              })
          } else {
              //Some sort of error
              internalError = 'Despite the error, payment has been processed. Do not attempt to purchase again. We will be in contact to alleviate the issue.'
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
          `Sorry, your transaction could not be processed...<br><br>${error}\n\n` + internalError
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

function checkSoldErrored() {
    let message = ''
    let error = false
    tote.forEach((pic) => {
        if (pic.sold || pic.errored) {
            message += 'Picture ' + pic.name + ' has been sold while you were shopping or is in dispute. Please remove the item from your cart to proceed.\n'
            message += 'Feel free to reach out to administration if you believe this is in error.\n'
            //TODO: Hackey, switch to id
            picDiv = document.getElementsByClassName('item_' + pic._id)[0]
            picDiv.style.border = '1px solid red'
            error = true
        }
    })
    if (error) {
        errorStatus.innerHTML = message
        throw new Error(message)
    }
}
