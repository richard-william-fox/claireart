const win = window
var userId = null
/*const sheets = document.querySelector('#allSheets')
const errorsNode = document.querySelector('#errorMessages')
const sheetStatus = document.querySelector('#sheetStatus')*/
const previewContent = document.querySelector('#previewContent')
const toteCount = document.querySelector('#toteCount')

win.addEventListener('load', async (event) => {
    //Pull in all files #TODO change this to five random images
    const allUrl = '/images/all'
    const allResp = await fetch(allUrl)
    const allData = await allResp.json()

    allData.forEach((data) => {
        var linkNode = document.createElement('a')
        linkNode.id = 'linkPic_' + data._id
        linkNode.target = '_blank'
        linkNode.href = "/picsDetail/" + data._id

        var imgNode = document.createElement('img')
        imgNode.id = 'pic_' + data._id
        imgNode.className = 'loader'
        imgNode.src = data.path

        linkNode.appendChild(imgNode)
        previewContent.appendChild(linkNode)
    })

    var count = 0
    var totePics = JSON.parse(localStorage.getItem('totePics'))
    if (!totePics) {
        localStorage.setItem('totePics', JSON.stringify([]))
        count = 0
    } else {
        count = totePics.length
    }

    toteCount.innerHTML = 'View Tote: ' + count

})
