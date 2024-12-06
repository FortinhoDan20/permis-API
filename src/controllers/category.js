const Category = require('../models/category')
const asyncHandler = require('express-async-handler')


const addCategory = asyncHandler(async(req, res ) => {
    try {
        const category = new Category(req.body)

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
})


const getAllCategories = asyncHandler(async(req, res) => {
    try {
        const categories = await Category.find()

        res.status(200).json({
            error: false,
            categories
        })
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})


module.exports = {addCategory, getAllCategories }
