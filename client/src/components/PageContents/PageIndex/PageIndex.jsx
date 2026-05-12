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
        '/images/indexPics',
    )

    return resp.data
}

export default PageIndex
