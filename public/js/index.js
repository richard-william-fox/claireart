const win = window
const indexContent = document.querySelector('#indexContent')
const toteCount = document.querySelector('#toteCount')
const prevButton = document.querySelector('#prevButton')
const nextButton = document.querySelector('#nextButton')
const pics1 = document.querySelector('#slidePics1')
const pics2 = document.querySelector('#slidePics2')
const pics3 = document.querySelector('#slidePics3')

let slideIndex = 1;
showSlides(slideIndex)

win.addEventListener('load', async (event) => {
    //Pull in all files #TODO change this to five random images
    const allUrl = '/images/indexPics'
    const allResp = await fetch(allUrl)
    const allData = await allResp.json()

    let index = 0
    let multiple = 6

    for (let i = 0; i < 2; i++) {
        for (let j = index; j < multiple * (i + 1); j++) {
            let data = allData[j]
            var linkNode = document.createElement('a')
            linkNode.id = 'linkPic_' + data._id
            linkNode.target = '_blank'
            linkNode.href = "/picsDetail/" + data._id

            var imgNode = document.createElement('img')
            imgNode.id = 'pic_' + data._id
            imgNode.className = 'loader'
            imgNode.src = data.thumbnail
            imgNode.width = '100px'
            imgNode.height = '100px'

            linkNode.appendChild(imgNode)

            if (i == 0) {
                pics1.appendChild(linkNode)
            } else if (i == 1) {
                pics2.appendChild(linkNode)
            } else if (i ==2) {
                pics3.appendChild(linkNode)
            }
            index += 1
        }
    }

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

function showSlides(n) {
  let i
  let slides = document.getElementsByClassName("mySlides")
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none'
  }
  slides[slideIndex-1].style.display = 'inline-flex'
}
