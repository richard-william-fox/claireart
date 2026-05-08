import { useLocation, useNavigate } from 'react-router'

import './PageDetails.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToteItem, incrementCount } from '../../Tote/ToteSlice'

const PageDetails = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const image = location.state.image
    const [toteStatus, setToteStatus] = useState('')
    const [inTote, setInTote] = useState(false)

    const dispatch = useDispatch()

    const items = useSelector((state) => state.tote.items)

    const addToTote = () => {
        setInTote(true)
        setToteStatus('Item added to tote.')
    }

    if (!inTote && items.find((item) => item._id === image._id)) {
        setInTote(true)
        setToteStatus('Item already in tote.')
    }

    if (!inTote && image.sold) {
        setInTote(true)
        setToteStatus('Item has sold.')
    }

    return (
        <div id="detailsPage" className="pageFlex">
            <div id="imageContent">
                <img id={'pic_' + image._id} src={image.path} />
            </div>
            <div id="imageDetails">
                <p id="imageName" className="cfText">
                    Name: {image.name}
                </p>
                <p id="imageWidth" className="cfText">
                    Width: {image.width}
                </p>
                <p id="imageHeight" className="cfText">
                    Height: {image.height}
                </p>
                <p id="imagePrice" className="cfText">
                    Price: {'$' + image.price}
                </p>
            </div>
            <div id="detailButtons" className="rounded-md shadow">
                <button
                    type="button"
                    id="addToTote"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cfButton"
                    onClick={() => {
                        dispatch(addToteItem(image))
                        dispatch(incrementCount())
                        addToTote()
                    }}
                    disabled={inTote}
                >
                    Add item to Tote
                </button>
                <br />
                <br />
                <button
                    type="button"
                    id="buyNow"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cfButton"
                    onClick={() => {
                        dispatch(addToteItem(image))
                        dispatch(incrementCount())
                        navigate('/tote')
                    }}
                    disabled={inTote}
                >
                    Purchase now
                </button>
            </div>
            <div id="detailStatus">
                <p id="toteStatus" className="cfText">
                    {toteStatus}
                </p>
            </div>
        </div>
    )
}
export default PageDetails
