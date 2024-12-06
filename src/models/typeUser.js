const mongoose = require('mongoose')



const typeUserSchema = new mongoose.Schema({
    name: String,
    slug: String
})

const TypeUser = mongoose.model('TypeUser', typeUserSchema)
module.exports = TypeUser