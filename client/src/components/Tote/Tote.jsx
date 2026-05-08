import { useSelector } from 'react-redux'
import './Tote.css'
import toteIcon from './tote.png'

const Tote = () => {
    const count = useSelector((state) => state.tote.count)

    return (
        <div id="toteLink" className="bg-gray-800">
            <a href="/tote" id="viewTote">
                <img src={toteIcon} />
                <p id="toteCount" className="cfText">
                    View Tote: {count ? count : 0}
                </p>
            </a>
        </div>
    )
}
export default Tote
