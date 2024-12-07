const express = require('express')
const { auth } = require('../middleware/authMiddleware')
const { checkPermit, apurement, getAllNP, getAllPermit } = require('../controllers/permis')
const router = new express.Router()


router.post('/check-permit', auth, checkPermit)

router.patch('/permit/:id', auth, apurement)

router.get('/permit-np', auth, getAllNP)

router.get('/all', auth, getAllPermit)





module.exports = router