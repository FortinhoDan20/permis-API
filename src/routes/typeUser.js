const express = require('express')
const { addType, getAll } = require('../controllers/typeUser')
const { auth } = require('../middleware/authMiddleware')
const router = new express.Router()


router.post('/add', auth, addType)

router.get('/', auth, getAll)


module.exports = router