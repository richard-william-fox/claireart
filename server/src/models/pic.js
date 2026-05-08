import mongoose from 'mongoose'
import validator from 'validator'

// Pic schema
const PicSchema = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    sold: {
        type: Boolean
    },
    path: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    type: {
        type: String
    },
    errored: {
        type: Boolean,
        default: false
    },
    weight: {
        type: Number,
        required: true
    },
    weight_unit: {
        type: String,
        required: true,
        default: 'oz'
    },
    newUpload: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true })

const Pic = mongoose.model('Pic', PicSchema)

// export model Pic with PicSchema
export default Pic
