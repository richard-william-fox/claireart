import express from 'express'
import Order from '../models/order.js'
import Pic from '../models/pic.js'

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
    //Create an order record and mark the pic as sold
    try {
        req.body.purchase_units.forEach( async (unit) => {
            const picId = unit.reference_id
            const orderData = {
                pic: picId,
                //TODO: do we need another loop here?
                transaction_id: unit.payments.captures[0].id
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

//module.exports = router
export default router
