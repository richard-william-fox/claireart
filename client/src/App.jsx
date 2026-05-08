import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import PageContainer from './components/PageContainer/PageContainer'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageContainer pageName="index" />} />
                <Route
                    path="/list"
                    element={<PageContainer pageName="list" />}
                />
                <Route
                    path="/details"
                    element={<PageContainer pageName="details" />}
                />
                <Route
                    path="/tote"
                    element={<PageContainer pageName="tote" />}
                />
                <Route
                    path="/about"
                    element={<PageContainer pageName="about" />}
                />
                <Route
                    path="/other"
                    element={<PageContainer pageName="other" />}
                />
                <Route
                    path="/contact"
                    element={<PageContainer pageName="contact" />}
                />
                <Route
                    path="/checkout"
                    element={<PageContainer pageName="checkout" />}
                />
                <Route path="/new" element={<PageContainer pageName="new" />} />
                <Route
                    path="/sold"
                    element={<PageContainer pageName="sold" />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
