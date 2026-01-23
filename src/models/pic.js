const mongoose = require('mongoose')
//const extend = require('mongoose-extend-schema')
const validator = require('validator')

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
})

const Pic = mongoose.model('Pic', PicSchema)

// export model user with UserSchema
module.exports = Pic
