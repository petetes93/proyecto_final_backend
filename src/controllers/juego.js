const {Juego} = require('../models/juego')

const create = async (req, res) => {
    const newJuego = await Juego.create(req.body)

    res.json(newJuego)
}

const getAll = async (req, res) => {
    console.log('esto funciona?');
const juegos = await Juego.find()


    res.json(juegos)

}

const getById = async (req, res) => {
    const juegoId = await Juego.findById(req.params.gameId)
    res.json(juegoId)
} 

const update = async (req, res) => {
    const juego = await Juego.findByIdAndUpdate(req.params.gameId, req.body, {
        new: true,
    })

    res.json(juego)
}

const remove = async (req, res) => {
    const juego = await Juego.findByIdAndDelete(req.params.gameId)

    if(!juego) return res.status(404).json({msg: 'Este juego no existe'})

    res.json(juego)
}


module.exports = {
    getById,
    create,
    getAll,
    update,
    remove,
}