const Specimen = require('../models/specimen')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const express = require('express')
const cloudinary = require('../utilis/cloudinary')
const upload = require('../utilis/multer')
const { auth } = require('../middleware/authMiddleware')
const router = new express.Router()




router.post('/add', auth, upload.single('file'), asyncHandler(async(req, res) => {

    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        const user = await User.findById(req.params.id)

        const specimenCheck = await Specimen.find()

        if(specimenCheck.length !== 0 ) {

            const lastSpecimen = specimenCheck[specimenCheck.length -1 ]
            await Specimen.findByIdAndUpdate(lastSpecimen._id, { isChief: false })
        }
        const specimen = new Specimen({user:user._id, signature: result.secure_url})

        await specimen.save()

        res.status(201).json({
            error: false,
            specimen
        })
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
}))
