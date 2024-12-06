const express = require('express')
const { auth } = require('../middleware/authMiddleware')
const { addCategory, getAllCategories } = require('../controllers/category')
const router = new express.Router()
const cloudinary = require('../utilis/cloudinary')
const upload = require('../utilis/multer')
const asyncHandler = require('express-async-handler')
const Category = require('../models/category')


router.post('/add', auth, upload.single('file'), asyncHandler(async(req, res) => {

    try {
        const result = await cloudinary.uploader.upload(req.file.path)

        const category = new Category({...req.body, image: result.secure_url})

        await category.save()

        res.status(201).json({
            error: false,
            category
        })
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
}))


router.get('/', auth, getAllCategories)



module.exports = router