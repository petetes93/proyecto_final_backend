const {juego} = require('../models/juego')

const create = async (req, res) => {
    const newJuego = await juego.create(req.body)

    res.json(newJuego)
}

const getAll = async (req, res) => {
const juegos = await juego.find()

    res.json(juegos)
}


const update = async (req, res) => {
    const juego = await juego.findByIdAndUpdate(req.params.juegoId, req.body, {
        new: true,
    })

    res.json(juego)
}

const remove = async (req, res) => {
    const juego = await juego.findByIdAndDelete(req.params.juegoId)

    if(!juego) return res.status(404).json({msg: 'Este juego no existe'})

    res.json(genre)
}


module.exports = {
    create,
    getAll,
    update,
    remove,
}