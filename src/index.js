const path = require('path')
const express = require('express')
const hbs = require('hbs')
const http = require('http')

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const picRouter = require('./routers/pic')

const port = process.env.PORT || 8082

const app = express()
const server = http.createServer(app)

app.use('pics', picRouter)

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))
app.use(express.json())

app.get('', (req, res) => {
    res.render('index', {
        header: 'Claire\'s Awesome Site',
        name: 'Claire\'s Awesome Site',
        title: 'Claire\'s Awesome Site'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        header: 'Claire\'s Awesome Site',
        name: 'Claire\'s Awesome Site',
        title: 'Claire\'s Awesome Site'
    })
})

app.get('/pics', (req, res) => {
    res.render('pics', {
        header: 'Claire\'s Awesome Site',
        name: 'Claire\'s Awesome Site',
        title: 'Claire\'s Awesome Site'
    })
})

app.get('/other', (req, res) => {
    res.render('other', {
        header: 'Claire\'s Awesome Site',
        name: 'Claire\'s Awesome Site',
        title: 'Claire\'s Awesome Site'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        header: 'Claire\'s Awesome Site',
        name: 'Claire\'s Awesome Site',
        title: 'Claire\'s Awesome Site'
    })
})

server.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})
