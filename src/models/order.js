import mongoose from 'mongoose'
import validator from 'validator'

// Player Character schema
const OrderSchema = mongoose.Schema({
    pic: {
        type : mongoose.Types.ObjectId, ref: 'Pic',
        required: true
    },
    transaction_id: {
        type: String,
        required: true
    },
})

const Order = mongoose.model('Order', OrderSchema)

// export model Order with OrderSchema
export default Order
