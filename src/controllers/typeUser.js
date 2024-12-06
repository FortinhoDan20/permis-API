const TypeUser = require('../models/typeUser')
const asyncHandler = require('express-async-handler')



const addType = asyncHandler(async(req, res) => {

    try {
        const typeUser = new TypeUser(req.body)

        await typeUser.save()

        res.status(201).json({
            error: false,
            data: typeUser
        })

        
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message,
          })
    }
})

const getAll = asyncHandler(async(req, res) => {

    try {
        const typeUsers = await TypeUser.find()

        res.status(200).json({
            error: false,
            data: typeUsers
        })
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message,
          })
    }
})


module.exports = { addType, getAll }