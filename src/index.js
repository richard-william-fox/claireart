const path = require('path')
const express = require('express')
const hbs = require('hbs')
const http = require('http')
require('./db/mongoose')

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const picRouter = require('./routers/pic')
const navRouter = require('./routers/nav')

const port = process.env.PORT || 8082

const app = express()
const server = http.createServer(app)

app.use(navRouter)
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
