import { useState, useEffect, createElement } from 'react'
import axios from 'axios'
import './SlideShow.css'
import SizeSelect from '../SizeSelect/SizeSelect'
import { Link } from 'react-router'

const SlideShow = (props) => {
    let skip = 0
    let limit = 5
    let picsCount = 0
    let maxDivs = 0
    let baseUrl = '/images/'
    let countUrl = '/images/countPics'

    switch (props.url) {
        case 'list':
            baseUrl += 'listPics/'
            countUrl += '/'
            break
        case 'new':
            baseUrl += 'newPics/'
            countUrl += 'New/'
            break
        case 'sold':
            baseUrl += 'soldPics/'
            countUrl += 'Sold/'
            break
    }

    const [imageData, setImageData] = useState(null)
    const [imageSize, setImageSize] = useState('All')
    const [slideIndex, setSlideIndex] = useState(1)
    const [buttonStyle, setButtonStyle] = useState('')

    const fetchData = async () => {
        let resp = await axios.get(countUrl + imageSize)
        let countObj = resp.data
        picsCount = countObj.count
        maxDivs = Math.ceil(picsCount / limit)

        if (maxDivs < 2) {
            setButtonStyle('none')
        }

        let allUrl = baseUrl + skip + '/' + limit + '/' + imageSize

        const imageResp = await axios.get(allUrl)

        return imageResp.data
    }

    useEffect(() => {
        const getImageData = async () => {
            const data = await fetchData()
            setImageData(data)
        }

        getImageData()
    }, [slideIndex, imageSize])

    const sizeChange = (value) => {
        setImageSize(value)
    }

    const prevSlide = (event) => {
        nextButton.style.display = ''
        if (slideIndex - 1 < 2) {
            prevButton.style.display = 'none'
        }
        skip -= limit
        setSlideIndex(slideIndex - 1)
    }

    const nextSlide = (event) => {
        prevButton.style.display = ''
        if (slideIndex + 2 >= maxDivs) {
            nextButton.style.display = 'none'
        }
        skip += limit
        setSlideIndex(slideIndex + 1)
    }

    if (!imageData) return false

    return (
        <>
            <SizeSelect sizeChange={sizeChange} />
            <div className="slideshow-container">
                <a
                    id="prevButton"
                    className="prev"
                    onClick={prevSlide}
                    style={{ display: buttonStyle }}
                >
                    &#10094;
                </a>
                <a
                    id="nextButton"
                    className="next"
                    onClick={nextSlide}
                    style={{ display: buttonStyle }}
                >
                    &#10095;
                </a>

                <div id="listSlidePics1" className="mySlides fade">
                    {imageData.map((image, idx) => {
                        return (
                            <Link
                                to="/details"
                                state={{ image: image }}
                                key={idx}
                            >
                                <img
                                    id={'pic_' + image._id}
                                    src={image.thumbnail.replace(
                                        'thumbnails',
                                        'thumb2x',
                                    )}
                                ></img>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

const prevSlide = (event) => {
    nextButton.style.display = ''
    if (slideIndex - 1 < 2) {
        prevButton.style.display = 'none'
    }
    slideIndex -= 1
}

const nextSlide = (event) => {
    prevButton.style.display = ''
    if (slideIndex + 2 >= maxDivs) {
        nextButton.style.display = 'none'
    }
    slideIndex += 1
}

export default SlideShow
