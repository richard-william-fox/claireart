const win = window
var userId = null
const imageContent = document.querySelector('#imageContent')
const imgNameP = document.querySelector('#imageName')
const imgWidthP = document.querySelector('#imageWidth')
const imgHeightP = document.querySelector('#imageHeight')
const imgPriceP = document.querySelector('#imagePrice')
const toteButton = document.querySelector('#addToTote')
const buyButton = document.querySelector('#buyNow')
const toteStatus = document.querySelector('#toteStatus')
let imageId
let totePics

win.addEventListener('load', async (event) => {
    //Check for current cart value
    totePics = getToteItems()

    //Pull in file
    imageId = window.location.pathname.split('/')[2]

    const allUrl = '/images/find/' + imageId
    const allResp = await fetch(allUrl)
    image = await allResp.json()


    if(totePics.includes(imageId)) {
        // Image is already in tote, disable add button and udpate status
        toteButton.disabled = true
        toteStatus.innerHTML = 'Item already in tote.'
    }

    var imgNode = document.createElement('img')
    imgNode.id = 'pic_' + image._id
    imgNode.className = 'loader'
    imgNode.src = image.path
    imgNode.style.width = '50%'
    imgNode.style.height = '50%'

    imageContent.appendChild(imgNode)

    imgNameP.innerHTML += ' ' + image.name
    imgWidthP.innerHTML += ' ' + image.width + '\'\''
    imgHeightP.innerHTML += ' ' + image.height + '\'\''
    imgPriceP.innerHTML += ' ' + image.price

    setTimeout(() => {
           imageContent.scrollIntoView({
               behavior: "smooth",
               block: "start",
           })
      }, 200)
})

toteButton.addEventListener('click', (event) => {
    totePics.push(imageId)
    setToteItem(totePics)

    toteStatus.innerHTML = 'Item added to tote.'
    toteButton.disabled = true
    toteCount.innerHTML = 'View Tote: ' + totePics.length
})

buyButton.addEventListener('click', (event) => {
    if(!totePics.includes(imageId)) {
        totePics.push(imageId)
        setToteItem(totePics)
    }

    window.location.replace('http://staging.tabletopsupercrew.net/viewTote')
})
