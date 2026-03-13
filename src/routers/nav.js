import path from 'path'
import express from 'express'
import hbs from 'hbs'
import http from 'http'

const router = express.Router()

let paypal

router.get('', (req, res) => {
    res.render('index', {
        header: 'Claire\'s Awesome Site',
        name: 'Claire\'s Awesome Site',
        title: 'Claire\'s Awesome Site'
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        header: 'Claire\'s Awesome Site',
        name: 'Claire\'s Awesome Site',
        title: 'Claire\'s Awesome Site'
    })
})

router.get('/pics', (req, res) => {
    res.render('pics', {
        header: 'Claire\'s Awesome Site',
        name: 'Claire\'s Awesome Site',
        title: 'Claire\'s Awesome Site'
    })
})

router.get('/picsDetail/:id', (req, res) => {
    res.render('picsDetail', {
        header: 'Claire\'s Awesome Site',
        name: 'Claire\'s Awesome Site',
        title: 'Claire\'s Awesome Site'
    })
})

router.get('/other', (req, res) => {
    res.render('other', {
        header: 'Claire\'s Awesome Site',
        name: 'Claire\'s Awesome Site',
        title: 'Claire\'s Awesome Site'
    })
})

router.get('/contact', (req, res) => {
    res.render('contact', {
        header: 'Claire\'s Awesome Site',
        name: 'Claire\'s Awesome Site',
        title: 'Claire\'s Awesome Site'
    })
})

router.get('/viewTote', (req, res) => {
    res.render('viewTote', {
        header: 'Claire\'s Awesome Site',
        name: 'Claire\'s Awesome Site',
        title: 'Claire\'s Awesome Site',
        paypal_url: 'https://www.paypal.com/sdk/js?client-id=' + process.env.PAYPAL_CLIENT_ID + '&buyer-country=US&currency=USD&components=buttons&enable-funding=venmo'
    })
})

router.get('/checkout', (req, res) => {
    res.render('checkout', {
        header: 'Claire\'s Awesome Site',
        name: 'Claire\'s Awesome Site',
        title: 'Claire\'s Awesome Site'
    })
})

export default router
