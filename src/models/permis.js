const mongoose = require('mongoose')



const permisSchema = new mongoose.Schema({

    numberPermit: Number,

    number: Number,

    requerant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Requerant",
        required: true,
    },

    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    }],

    montantAPayer: Number,

    isPaid: { 
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const Permis = mongoose.model('Permis', permisSchema)
module.exports = Permis