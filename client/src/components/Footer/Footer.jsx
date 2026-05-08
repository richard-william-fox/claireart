import './Footer.css'
import fbIcon from './fb.png'

const Footer = () => {
    return (
        <footer>
            <div id="footer">
                <div id="fbLink">
                    <a href="https://www.facebook.com/claire.nagode.9">
                        <img src={fbIcon} />
                    </a>
                </div>
                <div id="copyright">
                    <p>
                        By using this site you agree to the terms of service.
                        All images contained on this site are property of Claire
                        Fox Creations. Unauthorized use or redistribution of
                        content from the site is prohibited. &copy; Claire Fox
                        Creations <span id="year"></span> All Rights Reserved.
                    </p>
                </div>
                <p className="cfText">Created by Fox Software Solutions</p>
            </div>
            <script src="/js/footer.js"></script>
        </footer>
    )
}
export default Footer
