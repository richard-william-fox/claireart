import express from 'express'
import Order from '../models/order.js'
import Pic from '../models/pic.js'
import sendOrderEmail from '../emails/orders.js'

const router = express.Router()

router.get('/all', async (req, res) => {
    const pics = await Pic.find()
    res.status(200).send(pics)
})

router.get('/find/:id', async (req, res) => {
    const picId = req.params.id
    const pic = await Pic.findById(picId)

    res.status(200).send(pic)
})

router.post('/newOrder', async (req, res) => {
    res.status(500).send()
    //Create an order record and mark the pic as sold
    try {
        req.body.purchase_units.forEach( async (unit) => {
            const picId = unit.reference_id
            const orderData = {
                pic: picId,
                //TODO: do we need another loop here?
                transaction_id: unit.payments.captures[0].id,
                shipped: false
            }
            const order = new Order(orderData)
            await order.save()

            const pic = await Pic.findOneAndUpdate( { _id: picId }, { sold: true} )
        })

        res.status(201).send()
    } catch (error) {
        console.error('Error processing order: ')
        console.error(error)
    }
})

router.post('/sendOrderEmail/:success', (req, res) => {
    const errorInfo = {
        email: req.body.payer.email_address,
        transactions: JSON.stringify(req.body.purchase_units[0].payments.captures)
    }
    try {
        if (req.params.success == true) {
            sendOrderEmail()
        } else {
            sendOrderEmail(errorInfo)
        }
    } catch (error) {
        console.error('Error sending email: ' + error)
    }
    res.status(200).send()
})

export default router
