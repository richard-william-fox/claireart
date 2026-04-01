const win = window
const indexContent = document.querySelector('#indexContent')
const toteCount = document.querySelector('#toteCount')
const prevButton = document.querySelector('#prevButton')
const nextButton = document.querySelector('#nextButton')

let slideIndex = 1;
showSlides(slideIndex)

win.addEventListener('load', async (event) => {
    //Pull in all files #TODO change this to five random images
    const allUrl = '/images/indexPics'
    const allResp = await fetch(allUrl)
    const allData = await allResp.json()

    let index = 0
    let multiple = 6

    for (let i = 0; i < multiple; i++) {
        let data = allData[i]
        var linkNode = document.querySelector('#indexA' + (i + 1))
        linkNode.id = 'linkPic_' + data._id
        linkNode.target = '_blank'
        linkNode.href = "/picsDetail/" + data._id

        var imgNode = document.querySelector('#indexPic' + (i + 1))
        imgNode.id = 'pic_' + data._id
        imgNode.src = data.thumbnail
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
