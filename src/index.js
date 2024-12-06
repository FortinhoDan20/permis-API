const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./db/mongoose')



const port = process.env.PORT

connectDB()

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', async (req, res, next) => {
    res.send('WELCOME TO OUR GARAGE MANAGEMENT API !!!')
})

app.use('/api-type-user', require('./routes/typeUser'))
app.use('/api-user', require('./routes/user'))
app.use('/api-category', require('./routes/category'))
app.use('/api-requerant', require('./routes/requerant'))
app.use('/api-specimen', require('./models/specimen'))



app.listen(port, () => console.log(`Server started on port ${port}`))