const Permis = require('../models/permis')
const asyncHandler = require('express-async-handler')



const checkPermis = asyncHandler(async(req, res) => {

    try {
        const permis = await Permis.findOne({ numero: req.body.number}).populate(['requerant', 'categories'])

        res.status(200).json({
            error: false,
            permis
        })
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})


const apurement = asyncHandler(async(req, res) => {
    try {
        const permis = await Permis.findByIdAndUpdate(req.params.id, req.body, { new: true } )

        res.status(200).json({
            error: false,
            permis
        })

    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

const getAllNP = asyncHandler(async(req, res) => {
    try {
        const getAll = await Permis.find({ isPaid: false }).populate(['requerant', 'categories'])

        res.status(200).json({
            error: false,
            getAll
        })
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

const getAllPermis = asyncHandler(async(req, res) => {
    try {
        const getAll = await Permis.find({ isPaid: true }).populate(['requerant', 'categories'])

        res.status(200).json({
            error: false,
            getAll
        })
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})



module.exports = { checkPermis, apurement, getAllNP, getAllPermis }