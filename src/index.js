const express = require('express')
const cors = require('cors')
require('dotenv').config()



const port = process.env.PORT


const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.listen(port, () => console.log(`Server started on port ${port}`))