const path = require('path')
const express = require('express')
const hbs = require('hbs')
const http = require('http')

const router = express.Router()


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
        title: 'Claire\'s Awesome Site'
    })
})

router.get('/checkout', (req, res) => {
    res.render('checkout', {
        header: 'Claire\'s Awesome Site',
        name: 'Claire\'s Awesome Site',
        title: 'Claire\'s Awesome Site'
    })
})

module.exports = router
