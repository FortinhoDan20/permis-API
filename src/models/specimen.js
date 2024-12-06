const mongoose = require('mongoose')


const specimenSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    signature: String,
    isChief: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
})

const Specimen = mongoose.model('Specimen', specimenSchema)
module.exports = Specimen