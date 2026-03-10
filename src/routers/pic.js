//const express = require("express")
import express from 'express'
//const mongoose = require("mongoose")
//const ObjectId = require('mongodb').ObjectID;
//import ObjectId from 'mongodb'.objectID;
//const { check, validationResult} = require("express-validator/check")
//const Pic = require("../models/pic")
import Pic from '../models/pic.js'

const router = express.Router()

router.get('/', async (req, res) => {
    //const pics = await Pic.find()
    res.status(200).send({})
})

router.get('/indexPics', async(req, res) => {
    const pics = await Pic.find({ name: { $in: ['10x12 C1A.jpg', '10x12 C1C.jpg', '10x12 C1G.jpg', '10x20 C1A.jpg', '10x20 C1B.jpg', '10x20 C1F.jpg', '6x12 C1A.jpg', '8x10 1A.jpg', '8x10 1B.jpg', '8x10 1C.jpg', '8x10 1D.jpg', '8x24 C1A.jpg'] }})
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

//module.exports = router
export default router
