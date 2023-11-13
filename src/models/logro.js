const mongoose = require('mongoose');
const { body } = require('express-validator');

const logroSchema = new mongoose.Schema({
    title: { type: String, required: true },
    juego: { type: mongoose.ObjectId, required: true },
    user: { type: mongoose.ObjectId, ref:"User",  },
    plataforma: { type: String, required: true },
    date: { type: Date, required: true },
});

const Logro = mongoose.model('Logro', logroSchema);

const logroValidation = [
    body('title').notEmpty(),
    body('juego').notEmpty(),
    body('plataforma').isArray(),
    body('date').notEmpty(),
];

module.exports = {
    Logro: Logro,
    logroValidation: logroValidation,
};


