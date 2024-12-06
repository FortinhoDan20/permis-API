const mongoose = require('mongoose')



const requerantSchema = new mongoose.Schema({

    name: {
        type:String, 
        uppercase: true
    },
    postnom: {
        type:String, 
        uppercase: true
    },
    prenom: {
        type:String, 
        uppercase: true
    },
    sexe: String,
    lieuNaissance: {
        type:String, 
        uppercase: true
    },
    dateNaissance: { type: Date},
    nationalite: {
        type:String, 
        uppercase: true
    },
    PieceIdentite: String,
    numeroPiece: {
        type:String, 
        uppercase: true
    },
    adresse: {
        avenue: {
            type:String, 
            uppercase: true
        },
        quartier: {
            type:String, 
            uppercase: true
        },
        commune: {
            type:String, 
            uppercase: true
        }
    }
    
},{
    timestamps: true
})

const Requerant = mongoose.model('Requerant', requerantSchema)
module.exports = Requerant