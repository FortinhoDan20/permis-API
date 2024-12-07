const Permit = require('../models/permis')
const asyncHandler = require('express-async-handler')



const checkPermit = asyncHandler(async(req, res) => {

    try {
        const permis = await Permit.findOne({ numero: req.body.number}).populate(['requerant', 'categories'])

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
        const permit = await Permit.findByIdAndUpdate(req.params.id, req.body, { new: true } )

        res.status(200).json({
            error: false,
            permit
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
        const getAll = await Permit.find({ isPaid: false }).populate(['requerant', 'categories'])

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

const getAllPermit = asyncHandler(async(req, res) => {
    try {
        const getAll = await Permit.find({ isPaid: true }).populate(['requerant', 'categories'])

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



module.exports = { checkPermit, apurement, getAllNP, getAllPermit}