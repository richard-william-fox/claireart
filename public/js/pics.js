const win = window
const indexContent = document.querySelector('#indexContent')
const toteCount = document.querySelector('#toteCount')
const prevButton = document.querySelector('#prevButton')
const nextButton = document.querySelector('#nextButton')
const pics1 = document.querySelector('#listSlidePics1')
const slideshowContainer = document.getElementsByClassName('slideshow-container')[0]

let skip = 0
let limit = 5
let slideIndex = 1
let picsCount = 0
let maxDivs = 0
const baseUrl = '/images/listPics/'

win.addEventListener('load', async (event) => {
    prevButton.style.display = 'none'

    let countUrl = '/images/countPics'
    let resp = await fetch(countUrl)
    let countObj = await resp.json()
    picsCount = countObj.count
    maxDivs = Math.ceil(picsCount / limit)

    let allUrl = baseUrl + skip + '/' + limit
    const allResp = await fetch(allUrl)
    const allData = await allResp.json()

    buildPics(allData, slideIndex)

    var count = 0
    var totePics = getToteItems()
    if (!totePics) {
        setToteItem([])
        count = 0
    } else {
        count = totePics.length
    }

    toteCount.innerHTML = 'View Tote: ' + count

})

function buildPics(data, number) {
    let element
    if (number == 1) {
        element = pics1
        element.style.display = 'inline-flex'
    } else {
        element = document.createElement('div')
        element.id = 'listSlidePics' + number
        element.className = 'mySlides fade'
        element.style.display = 'inline-flex'
    }
    data.forEach((pic) => {
        var linkNode = document.createElement('a')
        linkNode.id = 'linkPic_' + pic._id
        linkNode.target = '_blank'
        linkNode.href = "/picsDetail/" + pic._id

        var imgNode = document.createElement('img')
        imgNode.id = 'pic_' + pic._id
        imgNode.className = 'loader'
        imgNode.src = pic.thumbnail.replace('thumbnails', 'thumb2x')

        linkNode.appendChild(imgNode)

        element.appendChild(linkNode)

        slideshowContainer.appendChild(element)
    })
}

//TODO: HACKY, CHANGE THIS FROM 2 TO 1 (LOOK WHERE SLIDE INDEX IS SET)
prevButton.addEventListener('click', (event) => {
    nextButton.style.display = ''
    if (slideIndex - 1 < 2) {
        prevButton.style.display = 'none'
    }
    changeSlides(-1)
})

nextButton.addEventListener('click', (event) => {
    prevButton.style.display = ''
    if (slideIndex + 2 == maxDivs) {
        nextButton.style.display = 'none'
    }
    changeSlides(1)
})

// Next/previous controls
const changeSlides = (n) => {
    showSlides(slideIndex += n);
}

async function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides")
    const curDiv = document.getElementById('listSlidePics' + n)

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
    }

    if (!curDiv) {
        //get next set of pics
        skip += limit
        let allUrl = baseUrl + skip + '/' + limit
        const allResp = await fetch(allUrl)
        const allData = await allResp.json()
        buildPics(allData, slideIndex)
    } else {
        curDiv.style.display = 'inline-flex'
    }
}
