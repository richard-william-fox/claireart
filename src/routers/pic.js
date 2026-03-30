import express from 'express'
import Pic from '../models/pic.js'

const router = express.Router()

router.get('/indexPics', async(req, res) => {
    const sample = { $sample: { size: 12 } }
    const match = { $match: { sold: false, errored: false } }
    //const pics = await Pic.find({ name: { $in: ['10x12 C1A.jpg', '10x12 C1C.jpg', '10x12 C1G.jpg', '10x20 C1A.jpg', '10x20 C1B.jpg', '10x20 C1F.jpg', '6x12 C1A.jpg', '8x10 1A.jpg', '8x10 1B.jpg', '8x10 1C.jpg', '8x10 1D.jpg', '8x24 C1A.jpg'] }})
    const pics = await Pic.aggregate([match, sample])
    return res.status(200).send(pics)
})

router.get('/listPics/:skip/:limit', async (req, res) => {
    const pics = await Pic.find(
        {
            sold: false,
            errored: false,
            thumbnail: { $ne: null },
        },
    ).skip(Number(req.params.skip)).limit(Number(req.params.limit))
    res.status(200).send(pics)
})

router.get('/countPics',  async (req, res) => {
    const count = await Pic.find({sold: false, errored: false}).count()

    res.status(200).send({'count': count})
})

router.get('/find/:id', async (req, res) => {
    const picId = req.params.id
    const pic = await Pic.findById(picId)

    res.status(200).send(pic)
})

router.post('/findPics', async (req, res) => {
    const pics = await Pic.find({'_id': {$in: req.body}})

    res.status(200).send(pics)
})

router.post('/new', async (req, res) => {
    const pic = new Pic(req.body)

    await pic.save()
    res.status(201).send(pic)
})

router.post('/error', (req, res) => {
    try {
        req.body.forEach(async (unit) => {
            const pic = await Pic.findOneAndUpdate({_id: unit.reference_id}, {errored: true})
        })
        res.status(200).send()
    } catch (error) {
        console.error('Error while settings pics to errored status: ')
        console.error(error)
        res.status(500).send()
    }
})

export default router
