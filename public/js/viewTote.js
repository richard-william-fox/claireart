const toteContents = document.querySelector('#toteContents')
const itemsTotal = document.querySelector('#itemsTotal')
const viewTote = document.querySelector('#viewTote')
const orderStatus = document.querySelector('#orderStatus')
const errorStatus = document.querySelector('#errorStatus')
const checkAddress = document.querySelector('#checkAddress')

let totalPrice = 0
let internalError = ''

let name, street, street2, city, state, zip, country, shipping

let tote

window.addEventListener('load', async (event) => {
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

        updateTotal(totalPrice)
    })
})

checkAddress.addEventListener('click', async () => {
    name = document.querySelector('#name').value,
    street = document.querySelector('#street').value,
    street2 = document.querySelector('#street2').value,
    city = document.querySelector('#city').value,
    state = document.querySelector('#state').value,
    zip = document.querySelector('#zip').value,
    country = document.querySelector('#country').value

    const addressTo = {
        name: name,
        street1: street,
        street2: street2, 
        city: city,
        state: state,
        zip: zip,
        country: country
    }

    let parcels = []
    tote.forEach((item) => {
        const parcel = {
            length: item.width.toString(),
            width: item.height.toString(),
            height: '1',
            distanceUnit: 'in',
            weight: '12',
            massUnit: 'oz'
        }
        parcels.push(parcel)
    })

    const body = {
        addressTo: addressTo,
        parcels: parcels
    }

    const resp = await fetch('/shippo', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
    const ship_data = await resp.json()
    shipping = ship_data.shipping
    addressTo.shipping = shipping

    setShippingInfo(addressTo)

    window.location.href = '/checkout'
})

const updateTotal = (tote) => {
    itemsTotal.innerHTML = 'Tote Total: $' + Number((tote).toFixed(2)) + ' USD'
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
            updateTotal(totalPrice)
        }
    })

    tote = tote.filter(function(el) { return el._id != id })
}
