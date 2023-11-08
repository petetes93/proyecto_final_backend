const {logro} = require('../models/logro')

const getAll = async (req, res) => {
    const {page = 1, search, logro, order} = req.query


    const query = {}
    let sort = {}

    const pageSize = 2
    const offset = (page - 1) * pageSize
    if (search) query.title = {$regex: search}

    if(order) sort[order] = 1

    const logros = await Logro.find(query)
        .populate('logros')
        .sort(sort)
        .limit(pageSize)
        .skip(offset)

    res.json(logros)
}

const getById = async (req, res) => {
    const logro = await Logro.findById(req.params.logroId).populate('logros')

    res.json(logro)
}

const create = async (req, res) => {
    console.log(req.user)
    const newLogro = await logro.create(req.body)

    res.json(newLogro)
}

const update = async ( req, res) => {
    const logro = await Logro.findByIdAndUpdate(req.params.logroId, req.body,{
        new: true,
    })

    res.json(logro)
}

const remove = async (req, res) => {
    const logro = await Logro.findByIdAndDelete(req.params.logroId)

    res.json(logro)
}


module.exports= {
    getAll,
    getById,
    create,
    update,
    remove,
}