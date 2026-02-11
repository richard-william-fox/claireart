const express = require("express")
const mongoose = require("mongoose")
const ObjectId = require('mongodb').ObjectID;
//const { check, validationResult} = require("express-validator/check")
const Pic = require("../models/pic")

const router = express.Router()

router.get('/', async (req, res) => {
    console.log('pics entered')
    //const pics = await Pic.find()
    res.status(200).send({})
})

router.get('/all', async (req, res) => {
    const pics = await Pic.find()
    res.status(200).send(pics)
})

router.get('/find/:id', async (req, res) => {
    const picId = req.params.id
    const pic = await Pic.findById(picId)

    res.status(200).send(pic)
})

module.exports = router
