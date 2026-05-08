import './NavBar.css'
import { Link } from 'react-router'

const NavBar = () => {
    const displayMobileMenu = (el) => {
        el.classList.toggle('change')
        var Menu = document.querySelector('#Menu')
        if (Menu.style.display === 'none') {
            Menu.style.display = 'block'
        } else {
            Menu.style.display = 'none'
        }
    }

    return (
        <nav id="navBanner" className="relative bg-gray-800">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div
                    className="relative flex h-16 items-center justify-between"
                    style={{ display: 'block' }}
                >
                    <div
                        className="container"
                        onClick={() => {
                            displayMobileMenu(this)
                        }}
                    >
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>

                    <div
                        id="Menu"
                        style={{
                            backgroundColor: 'rgb(217, 231, 255)',
                            display: 'none',
                        }}
                    >
                        <a href="/">Home</a>
                        <a href="/list">Pictures</a>
                        <a href="/about">About</a>
                        <a href="/other">Other</a>
                        <a href="/contact">Contact</a>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start noWrapText">
                        <div id="allWidth" className="sm:ml-6 sm:block">
                            <div id="bannerItems">
                                <div id="navLinks">
                                    <Link
                                        id="banner-home"
                                        to="/"
                                        aria-current="page"
                                        className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        id="banner-pics"
                                        to="/list"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                    >
                                        All Pictures
                                    </Link>
                                    <Link
                                        id="banner-about"
                                        to="/about"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                    >
                                        About
                                    </Link>
                                    <Link
                                        id="banner-other"
                                        to="/other"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                    >
                                        Other Art
                                    </Link>
                                    <Link
                                        id="banner-contact"
                                        to="/contact"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                    >
                                        Contact
                                    </Link>
                                    <Link
                                        id="banner-contact"
                                        to="/new"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                    >
                                        New
                                    </Link>
                                    <Link
                                        id="banner-contact"
                                        to="/sold"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                    >
                                        Recently Sold
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default NavBar
