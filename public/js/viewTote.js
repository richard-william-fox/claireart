const win = window
var userId = null
/*const sheets = document.querySelector('#allSheets')
const errorsNode = document.querySelector('#errorMessages')
const sheetStatus = document.querySelector('#sheetStatus')*/
const toteContents = document.querySelector('#toteContents')
const itemsTotal = document.querySelector('#toteTotal')
const shippingTotal = document.querySelector('#shippingTotal')
const grandTotal = document.querySelector('#grandTotal')
const viewTote = document.querySelector('#viewTote')
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
        var imgPWidth = document.createElement('p')
        var imgPHeight = document.createElement('p')
        var imgPPrice = document.createElement('p')

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
