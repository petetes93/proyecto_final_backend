const {Logro} = require('../models/logro');

const getAll = async (req, res) => {
    const { page = 1, search, logro, order } = req.query;

    const query = {};
    let sort = {};

    const pageSize = 2;
    const offset = (page - 1) * pageSize;
    if (search) query.title = { $regex: search };

    if (order) sort[order] = 1;

    try {
        const logros = await Logro.find(query)
            .populate('juego')
            .sort(sort)
            .limit(pageSize)
            .skip(offset);

        res.json(logros);
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getById = async (req, res) => {
    try {
        const logro = await Logro.findById(req.params.logroId).populate('juego');

        res.json(logro);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const create = async (req, res) => {
    console.log(req.user);
    const newLogro = await Logro.create(req.body);

    res.json(newLogro);
}

const update = async (req, res) => {
    const logro = await Logro.findByIdAndUpdate(req.params.logroId, req.body, {
        new: true,
    });

    res.json(logro);
}

const remove = async (req, res) => {
    const logro = await Logro.findByIdAndDelete(req.params.logroId);

    res.json(logro);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};

