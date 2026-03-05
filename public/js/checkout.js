const win = window
var userId = null
const toteContents = document.querySelector('#toteContents')
const itemsTotal = document.querySelector('#toteTotal')
const shippingTotal = document.querySelector('#shippingTotal')
const grandTotal = document.querySelector('#grandTotal')
const viewTote = document.querySelector('#viewTote')
const buyButton = document.querySelector('#payPalPurchase')
let totalPrice = 0
let shippingPrice = 0
let tote = {}

win.addEventListener('load', async (event) => {
    //Hide tote link
    viewTote.style.visibility = 'hidden'
    //Pull in all files #TODO change this to five random images
    let totePics = JSON.parse(localStorage.getItem('totePics'))

    const baseUrl = '/images/find/'

    totePics.forEach(async (picId) => {
        let url = baseUrl + picId
        let resp = await fetch(url)
        let data = await resp.json()

        tote[data._id] = data

        totalPrice += data.price
        let itemDiv = document.createElement('div')
        itemDiv.className = 'item_' + data._id

        let imgDiv = document.createElement('div')
        imgDiv.id = 'img_' + data._id

        let imgNode = document.createElement('img')
        imgNode.id = 'pic_' + data._id
        imgNode.className = 'loader'
        imgNode.src = data.path

        let pDiv = document.createElement('div')
        pDiv.className = 'imgP_' + data._id

        let imgPName = document.createElement('p')
        imgPName.className = 'cfText'
        let imgPWidth = document.createElement('p')
        imgPWidth.className = 'cfText'
        let imgPHeight = document.createElement('p')
        imgPHeight.className = 'cfText'
        let imgPPrice = document.createElement('p')
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

buyButton.addEventListener('click', async (event) => {
    let url = '/paypalpurchase'
    let postInfo = tote
    postInfo.totalPrice = Number((totalPrice).toFixed(2)) 
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postInfo)
    })
})

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

const updateTotal = (tote, shipping) => {
    toteTotal.innerHTML = 'Tote Total: $' + Number((tote).toFixed(2)) + ' USD'
    shippingTotal.innerHTML = 'Shipping: $' + Number((shipping).toFixed(1)) + ' USD'
    grandTotal.innerHTML = 'Final cost: $' + Number((tote + shipping).toFixed(1)) + ' USD' 
}
