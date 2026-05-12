import './PageContainer.css'

import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import Banner from '../Banner/Banner'
import PageIndex from '../PageContents/PageIndex/PageIndex'
import PageList from '../PageContents/PageList/PageList'
import PageDetails from '../PageContents/PageDetails/PageDetails'
import PageTote from '../PageContents/PageTote/PageTote'
import PageCheckout from '../PageContents/PageCheckout/PageCheckout'
import PageAbout from '../PageContents/PageAbout/PageAbout'
import PageOther from '../PageContents/PageOther/PageOther'
import PageContact from '../PageContents/PageContact/PageContact'
import PageNew from '../PageContents/PageNew/PageNew'
import PageSold from '../PageContents/PageSold/PageSold'
import Footer from '../Footer/Footer'

const PageContainer = ({ pageName }) => {
    const initialOptions = {
        'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: 'USD',
        intent: 'capture',
        components: 'buttons',
    }

    if (pageName === 'index') {
        return (
            <section>
                <Banner />
                <PageIndex />
                <Footer />
            </section>
        )
    } else if (pageName === 'list') {
        return (
            <section>
                <Banner />
                <PageList />
                <Footer />
            </section>
        )
    } else if (pageName === 'details') {
        return (
            <section>
                <Banner />
                <PageDetails />
                <Footer />
            </section>
        )
    } else if (pageName === 'tote') {
        return (
            <section>
                <Banner />
                <PageTote />
                <Footer />
            </section>
        )
    } else if (pageName === 'about') {
        return (
            <section>
                <Banner />
                <PageAbout />
                <Footer />
            </section>
        )
    } else if (pageName === 'other') {
        return (
            <section>
                <Banner />
                <PageOther />
                <Footer />
            </section>
        )
    } else if (pageName === 'contact') {
        return (
            <section>
                <Banner />
                <PageContact />
                <Footer />
            </section>
        )
    } else if (pageName === 'checkout') {
        return (
            <section>
                <Banner />
                <PayPalScriptProvider options={initialOptions}>
                    <PageCheckout />
                </PayPalScriptProvider>
                <Footer />
            </section>
        )
    } else if (pageName === 'new') {
        return (
            <section>
                <Banner />
                <PageNew />
                <Footer />
            </section>
        )
    } else if (pageName === 'sold') {
        return (
            <section>
                <Banner />
                <PageSold />
                <Footer />
            </section>
        )
    }
}

export default PageContainer
