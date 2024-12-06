const User = require('../models/user')

const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')



const addUser = asyncHandler(async(req, res) => {

    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt)

        const user = new User({ ...req.body, password:hashedPassword})

        await user.save()

        res.status(201).json({
            error: false,
            message: "lo",
            data: user
        })
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message,
          });
    }
})

const loginUser = asyncHandler(async(req, res) => { 

    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })
        if(user  && (await bcryptjs.compare(password, user.password))){
            if(user.isLocked){
                res.status(500).json({
                    state: false,
                    message: "Votre compte a été bloqué. Veuillez contacter l'administrateur"
                })

            }else{

                const token = generateToken(user._id)

                res.status(200).json({
                    error: true,
                    message: "Connexion reussie",
                    user, 
                    token 
                })
            }
        }else {
            res.status(500).json({
                error: false,
                message: "Vos identifiants sont erronés"
            })
        }
    }catch (e) {
        res.status(401).json({
            error: true,
            message: e.message
        })
    }
})

const getAllUsers = asyncHandler(async(req, res)  => {
    try {
        const users = await User.find().populate(['typeUser'])

        res.status(200).json({
            error: false,
            data: users
        })
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message,
          });
    }
})

const getUser = asyncHandler(async(req, res) => {
    try {
        const user = await User.findById(req.params.id).populate[('typeUser')]

        res.status(200).json({
            error: false,
            user
        })
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

const blockUser = asyncHandler(async(req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(user.isLocked){

            await User.findByIdAndUpdate(req.params.id, { isLocked: false }, { new: true })

        }else{
            await User.findByIdAndUpdate(req.params.id, { isLocked: true }, { new: true })
        }
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})


module.exports = { addUser, loginUser, getAllUsers, getUser, blockUser }


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}