const express = require('express')
const { addUser, loginUser, getAllUsers, getUser, blockUser } = require('../controllers/user')
const { auth } = require('../middleware/authMiddleware')
const router = new express.Router()


router.post('/add', addUser)

router.post('/login', loginUser)

router.get('/', auth,  getAllUsers)

router.get('/:id', auth, getUser)

router.patch('/:id', auth, blockUser)

module.exports = router