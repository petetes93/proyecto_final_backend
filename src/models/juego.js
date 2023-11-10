const mongoose = require('mongoose')
const {body} = require('express-validator')

const juegoSchema = new mongoose.Schema({

    title: { type: String, required: true},
    plataforma: {type: [String], required: true},
    
})

const Juego = mongoose.model('Juego',juegoSchema)

const juegoValidation = [
    body('title').notEmpty(),
    body('plataforma').isArray(),
]

exports.Juego = Juego
exports.juegoValidation = juegoValidation