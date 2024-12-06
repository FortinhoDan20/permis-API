const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        uppercase: true
    },
    name: {
        type: String,
        uppercase: true
    },
    lastName: {
        type:String, 
        uppercase: true
    },
    sex: String,
    service: {
        type: String,
        uppercase: true
    },
    siteAffectation: {
        type: String,
        uppercase: true
    },
    grade: {
        type: String,
        uppercase: true
    },
    username: String,
    password: String,
    typeUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TypeUser",
        required: true,
    },
    isLocked:{
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User