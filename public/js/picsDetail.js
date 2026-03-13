const win = window
var userId = null
const previewContent = document.querySelector('#imageContent')
const imgNameP = document.querySelector('#imageName')
const imgWidthP = document.querySelector('#imageWidth')
const imgHeightP = document.querySelector('#imageHeight')
const imgPriceP = document.querySelector('#imagePrice')
const toteCount = document.querySelector('#toteCount')
const toteButton = document.querySelector('#addToTote')
const buyButton = document.querySelector('#buyNow')
const toteStatus = document.querySelector('#toteStatus')
var imageId
var totePics

win.addEventListener('load', async (event) => {
    //Check for current cart value
    var count = 0
    totePics = JSON.parse(localStorage.getItem('totePics'))
    count = (totePics != null ? totePics.length : 0)

    toteCount.innerHTML += count

    //Pull in file
    imageId = window.location.pathname.split('/')[2]

    if(totePics.includes(imageId)) {
        // Image is already in tote, disable add button and udpate status
        toteButton.disabled = true
        toteStatus.innerHTML = 'Item already in tote.'
    }

    const allUrl = '/images/find/' + imageId
    const allResp = await fetch(allUrl)
    const data = await allResp.json()

    var imgNode = document.createElement('img')
    imgNode.id = 'pic_' + data._id
    imgNode.className = 'loader'
    imgNode.src = data.path

    previewContent.appendChild(imgNode)

    imgNameP.innerHTML += ' ' + data.name
    imgWidthP.innerHTML += ' ' + data.width + '\'\''
    imgHeightP.innerHTML += ' ' + data.height + '\'\''
    imgPriceP.innerHTML += ' ' + data.price
})

toteButton.addEventListener('click', (event) => {
    totePics.push(imageId)
    localStorage.setItem('totePics', JSON.stringify(totePics))

    toteStatus.innerHTML = 'Item added to tote.'
    toteButton.disabled = true
    toteCount.innerHTML = 'View Tote: ' + totePics.length
})

buyButton.addEventListener('click', (event) => {
    if(!totePics.includes(imageId)) {
        totePics.push(imageId)
        localStorage.setItem('totePics', JSON.stringify(totePics))
    }

    window.location.replace('http://staging.tabletopsupercrew.net/viewTote')
})
