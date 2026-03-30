import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import bodyParser from 'body-parser'
import hbs from 'hbs'
import http from 'http'
import './db/mongoose.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

import picRouter from './routers/pic.js'
import orderRouter from './routers/order.js'
import navRouter from './routers/nav.js'
import paypalRouter from './routers/paypal.js'

const port = process.env.PORT || 8082

const app = express()
const server = http.createServer(app)

app.use(bodyParser.json())
app.use(navRouter)
app.use(paypalRouter)
app.use('/images', picRouter)
app.use(orderRouter)

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))
app.use(express.json())

app.get('/upgrades', (req, res) => {
    res.render('upgrades', {
        header: 'Claire Fox Creations',
        name: 'Claire Fox Creations',
        title: 'Claire Fox Creations'
    })
})

/*app.post('/tosAgreement', (req, res) => {
    if (req.body.tos) {
        res.cookie('tosAgreement', true)
        console.log('cookie set in index: ')
        return res.status(200).send()
    }
    return res.status(500).send({})
})*/

server.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})
