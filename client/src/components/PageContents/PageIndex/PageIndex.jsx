import { useState, useEffect } from 'react'
import axios from 'axios'

import './PageIndex.css'
import { Link } from 'react-router'

const PageIndex = () => {
    const [indexData, setIndexData] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const data = await fetchData()
            setIndexData(data)
        }

        getData()
    }, []) // ← empty array means "run once on mount"

    if (!indexData) return false

    return (
        <div id="indexPage" className="pageFlex">
            <div id="indexContent" className="bg-gray-900">
                <div className="slideshow-container">
                    <div id="slidePics1" className="mySlides fade">
                        {indexData.map((datum, idx) => {
                            return (
                                <Link
                                    to="/details"
                                    state={{ image: datum }}
                                    key={idx}
                                >
                                    <img
                                        id={'indexPic' + idx}
                                        src={datum.thumbnail}
                                    />
                                </Link>
                            )
                        })}
                        {/* <a
                            id="indexA1"
                            href={'/picsDetail/' + indexData[0]._id}
                        >
                            <img id="indexPic1" src={indexData[0].thumbnail} />
                        </a>
                        <a
                            id="indexA2"
                            href={'/picsDetail/' + indexData[1]._id}
                        >
                            <img id="indexPic2" src={indexData[1].thumbnail} />
                        </a>
                        <a
                            id="indexA3"
                            href={'/picsDetail/' + indexData[2]._id}
                        >
                            <img id="indexPic3" src={indexData[2].thumbnail} />
                        </a>
                        <a
                            id="indexA4"
                            href={'/picsDetail/' + indexData[3]._id}
                        >
                            <img id="indexPic4" src={indexData[3].thumbnail} />
                        </a>
                        <a
                            id="indexA5"
                            href={'/picsDetail/' + indexData[4]._id}
                        >
                            <img id="indexPic5" src={indexData[4].thumbnail} />
                        </a>
                        <a
                            id="indexA6"
                            href={'/picsDetail/' + indexData[5]._id}
                        >
                            <img id="indexPic6" src={indexData[5].thumbnail} />
                        </a> */}
                    </div>
                </div>
            </div>
            <br />
            <script src="/js/index.js"></script>
        </div>
    )
}

const fetchData = async () => {
    const resp = await axios.get(
        process.env.REACT_APP_API_URL + '/images/indexPics',
    )

    return resp.data
}

export default PageIndex
