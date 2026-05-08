import SlideShow from '../../SlideShow/SlideShow'
import './PageList.css'

const PageList = () => {
    return (
        <div id="listPage" className="pageFlex">
            <div id="listContent" className="bg-gray-950">
                <SlideShow url="list" />
            </div>
        </div>
    )
}

export default PageList
