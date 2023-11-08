const mongoose = require('mongoose')
const {body} = require('express-validator')

const logroSchema = new mongoose.Schema({
    title: {type: String, required: true},
    juego: {type: String, required: true},
    plataforma: {type: [String], required: true},
    date: {type: Date, required: true},
})
//! cambiar juego por Id de juego para enlazarlo y cambiar plataforma array por string por comas

const Logro = mongoose.model('Logro', logroSchema)

const logroValidation = [
    body('title').notEmpty(),
    body('juego').notEmpty(),
    body('plataforma').isArray(),
    body('date').notEmpty(),
]

exports.Logro = Logro
exports.logroValidation = logroValidation
