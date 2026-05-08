import SlideShow from '../../SlideShow/SlideShow'

const PageNew = () => {
    return (
        <div id="newPage" className="pageFlex">
            <div id="newContent" className="bg-gray-950">
                <SlideShow url="new" />
            </div>
        </div>
    )
}
export default PageNew
