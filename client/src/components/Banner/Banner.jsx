import './Banner.css'
import bannerImage from './8x24 C1C.jpg'
import NavBar from '../NavBar/NavBar'
import Tote from '../Tote/Tote'

const Banner = () => {
    return (
        <section>
            <div id="headerImg" className="bg-gray-500">
                <img src={bannerImage} />
            </div>
            <div id="banner">
                <NavBar />
                <Tote />
            </div>
        </section>
    )
}
export default Banner
