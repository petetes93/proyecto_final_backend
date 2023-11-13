const mongoose = require('mongoose')
const {Logro} = require('../models/logro');
const { User } = require('../models/user')

const getAll = async (req, res) => {
    console.log('esto funciona?');
    
    const logro = await Logro.find()
    
    
        res.json(logro)
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
    try {
        console.log(req.user);
        const userId = req.user.id;

        let newLogroData = {
            ...req.body,
            user: new mongoose.Types.ObjectId(userId)
        };

        const newLogro = await Logro.create(newLogroData);

        await User.findByIdAndUpdate(userId, { $push: { logros: newLogro._id } });

        res.json(newLogro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el logro' });
    }
}




const update = async (req, res) => {
    
        try {
            console.log(req.user);
            console.log(req.params);
            
            
            const userId = req.user.id;
    
            const logro = await Logro.findById(req.params.logroId);
            console.log(logro);
            // if (!logro) {
            //     return res.status(403).json({ error: 'No existe el logro' });
            // }
            console.log(typeof userId);
            console.log(typeof logro.user);
            if(userId === logro.user.toString() ){
                const updatedLogro = await Logro.findByIdAndUpdate(req.params.logroId, req.body, {
                    new: true,
                });
                
                res.json(updatedLogro);    
            }else {
                return res.status(403).json({ error: 'No tienes acceso a modificar este logro' });
            }
            
    
        
            
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        
    }
    
  
    
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

