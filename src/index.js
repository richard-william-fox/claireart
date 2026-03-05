//const path = require('path')
import path from 'path'
import { fileURLToPath } from 'url'
//const express = require('express')
import express from 'express'
//const bodyParser = require("body-parser")
import bodyParser from 'body-parser'
//const hbs = require('hbs')
import hbs from 'hbs'
//const http = require('http')
import http from 'http'
//const paypal = require('paypal-rest-sdk')
//import { loadScript } from "@paypal/paypal-js"
//require('./db/mongoose')
import './db/mongoose.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure paypal
/*const paypal = await loadCoreSdkScript({
    environment: "sandbox", // "sandbox" | "production"
    debug: true, // optional
})*/

/*const sdkInstance = await paypal.createInstance({
    clientToken: "YOUR_CLIENT_TOKEN",
    components: ["paypal-payments", "venmo-payments"],
    locale: "en-US",
    pageType: "checkout",
})*/

/*paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
})*/

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//const picRouter = require('./routers/pic')
import picRouter from './routers/pic.js'
//const navRouter = require('./routers/nav')
import navRouter from './routers/nav.js'
//const paypalRouter = require('./routers/paypal')
import paypalRouter from './routers/paypal.js'

const port = process.env.PORT || 8082

const app = express()
const server = http.createServer(app)

app.use(bodyParser.json())
app.use(navRouter)
app.use(paypalRouter)
app.use('/images', picRouter)

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))
app.use(express.json())

server.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})
