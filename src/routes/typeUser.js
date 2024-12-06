const express = require('express')
const { addType, getAll } = require('../controllers/typeUser')
const router = new express.Router()


router.post('/add', addType)

router.get('/', getAll)


module.exports = router