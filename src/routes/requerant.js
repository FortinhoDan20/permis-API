const express = require('express')
const { auth } = require('../middleware/authMiddleware')
const { addRequerant, getDetails, getAllRequerants } = require('../controllers/requerant')
const router = new express.Router()


router.post('/add', auth, addRequerant)

router.get('/requrant/:id', auth, getDetails )

router.get('/', auth, getAllRequerants)





module.exports = router