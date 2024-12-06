const express = require('express')
const { auth } = require('../middleware/authMiddleware')
const { addRequerant, getDetails } = require('../controllers/requerant')
const router = new express.Router()


router.post('/add', auth, addRequerant)

router.get('/requrant/:id', auth, getDetails )





module.exports = router