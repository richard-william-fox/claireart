//const mongoose = require('mongoose')
import mongoose from 'mongoose'

mongoose.connect(process.env.DB_CONNECTION, {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
    //useUnifiedTopology: true
})
