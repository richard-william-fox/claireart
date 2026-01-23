const express = require("express")
//const { check, validationResult} = require("express-validator/check")
const Pic = require("../models/pic")

const router = express.Router()

router.get('/all', async (req, res) => {
    const pics = await Pic.find(
    res.status(200).send(pics))
})

module.exports = router
