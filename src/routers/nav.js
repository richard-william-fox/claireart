//const path = require('path')
import path from 'path'
//const express = require('express')
import express from 'express'
//const hbs = require('hbs')
import hbs from 'hbs'
//const http = require('http')
import http from 'http'

const router = express.Router()

let paypal

/*try {
    paypal = await loadScript({ clientId: PROCESS.ENV.PAYPAL_CLIENT_ID });
} catch (error) {
    console.error("failed to load the PayPal JS SDK script", error);
}*/

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

/*router.post('/paypalpurchase', async (req, res) => {
    let items = []

    Object.keys(req.body).forEach(key => {
        if(key != 'totalPrice') {
            let item = {}
            item.name = req.body[key].name
            item.price = req.body[key].price
            item.currency = "USD"
            item.quantity = 1

            items.push(item)
        }
    })
    console.log('items:')
    console.log(items)

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://staging.tabletopsupercrew.net/success",
            "cancel_url": "http://staging.tabletopsupercrew.net/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Red Sox Hat",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "40.00"
            },
            "description": "Hat for the best team ever"
        }]
    }

    console.log('json')
    console.log(create_payment_json)

    paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
            throw error;
        } else {
            for(let i = 0;i < payment.links.length;i++){
              if(payment.links[i].rel === 'approval_url'){
                res.redirect(payment.links[i].href);
              }
            }
        }
      })
})

router.get('/paypalsuccess', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "25.00"
          }
      }]
    }

    paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          res.send('Success');
      }
  })
})

router.get('paypalcancel', (req, rse) => {
    res.render('paypal_cancel', {
        header: 'Claire\'s Awesome Site',
        name: 'Claire\'s Awesome Site',
        title: 'Claire\'s Awesome Site'
    })
})*/

//module.exports = router
export default router
