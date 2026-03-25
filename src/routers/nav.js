import path from 'path'
import express from 'express'
import hbs from 'hbs'
import http from 'http'
import upgrades from '../middleware/upgrades.js'

const router = express.Router()
router.use(upgrades)

let paypal

router.get('', (req, res) => {
    res.render('index', {
        header: 'Claire Fox Creations',
        name: 'Claire Fox Creations',
        title: 'Claire Fox Creations'
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        header: 'Claire Fox Creations',
        name: 'Claire Fox Creations',
        title: 'Claire Fox Creations'
    })
})

router.get('/pics', (req, res) => {
    res.render('pics', {
        header: 'Claire Fox Creations',
        name: 'Claire Fox Creations',
        title: 'Claire Fox Creations'
    })
})

router.get('/picsDetail/:id', (req, res) => {
    res.render('picsDetail', {
        header: 'Claire Fox Creations',
        name: 'Claire Fox Creations',
        title: 'Claire Fox Creations'
    })
})

router.get('/other', (req, res) => {
    res.render('other', {
        header: 'Claire Fox Creations',
        name: 'Claire Fox Creations',
        title: 'Claire Fox Creations'
    })
})

router.get('/contact', (req, res) => {
    res.render('contact', {
        header: 'Claire Fox Creations',
        name: 'Claire Fox Creations',
        title: 'Claire Fox Creations'
    })
})

router.get('/viewTote', (req, res) => {
    res.render('viewTote', {
        header: 'Claire Fox Creations',
        name: 'Claire Fox Creations',
        title: 'Claire Fox Creations',
        paypal_url: 'https://www.paypal.com/sdk/js?client-id=' + process.env.PAYPAL_CLIENT_ID + '&buyer-country=US&currency=USD&components=buttons&enable-funding=venmo'
    })
})

router.get('/checkout', (req, res) => {
    res.render('checkout', {
        header: 'Claire Fox Creations',
        name: 'Claire Fox Creations',
        title: 'Claire Fox Creations'
    })
})

export default router
