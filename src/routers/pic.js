const express = require("express")
const mongoose = require("mongoose")
const ObjectId = require('mongodb').ObjectID;
//const { check, validationResult} = require("express-validator/check")
const Pic = require("../models/pic")

const router = express.Router()

router.get('/', async (req, res) => {
    //const pics = await Pic.find()
    res.status(200).send({})
})

router.get('/indexPics', async(req, res) => {
    const pics = await Pic.find().limit(5)
    return res.status(200).send(pics)
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

router.post('/new', async (req, res) => {
    const pic = new Pic(req.body)

    await pic.save()
    res.status(201).send(pic)
})

module.exports = router
