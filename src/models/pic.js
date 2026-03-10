//const mongoose = require('mongoose')
import mongoose from 'mongoose'
//const extend = require('mongoose-extend-schema')
//const validator = require('validator')
import validator from 'validator'

// Player Character schema
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
    }
})

const Pic = mongoose.model('Pic', PicSchema)

// export model user with PicSchema
//module.exports = Pic
export default Pic
