const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    name: String,
    image: String,
    prix: Number,
    slug: String
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category