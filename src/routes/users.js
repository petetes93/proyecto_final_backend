const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { User } = require('../models/user');
const mongoIdFromParamValidation = require('../middlewares/mongoIdFromParam')
const validate = require('../middlewares/validate')
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const router = Router();

router.post('/login', async (req, res) => {
    const { username, password: passwordPlainText } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ msg: 'Usuario o contraseña incorrecto' });
    }
    
    const { active } = user;

    if(!active){
        return res.status(401).json({msg: 'No estás autorizado.'})
       
    }
    

    const isValidUser = await bcrypt.compare(passwordPlainText, user.password);

    if (!isValidUser) {
        return res.status(400).json({ msg: 'Usuario o contraseña incorrecto' });
    }

    const token = jwt.sign(
        { id: user._id,email: user.email, name: user.username, isAdmin: user.isAdmin },
        process.env.privateKey
    );

    res.setHeader('x-auth-token', token);
    res.json({ msg: 'Usuario logueado' });
});
router.put(
    '/:userId',
    auth,
    admin,
    mongoIdFromParamValidation('userId'),
    validate,
    async (req, res) => {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
        })
       
        res.json(user)
    }
);

router.get(
    '/', 
    validate, 
    async (req, res) => {
    console.log('¿Esto funciona?');
    
        const usuarios = await User.find().populate({ 
            path: 'logros',
            populate: {
              path: 'juego',
              model: 'Juego'
            }
         }).exec(); 
        res.json(usuarios)
   
    
});

router.get(
    '/:userId',
     auth,
      mongoIdFromParamValidation('userId'),
    
      (req, res) => {
        
    const { userId } = req.params;

    User.findById(userId).populate({ 
        path: 'logros',
        select: 'title'
     })
        .then((user) => {
            
            if (!user) {
                return res.status(404).json({ msg: 'Usuario no encontrado' });
            }

            res.json({ user });
        })
       
});

router.post(
    '/register',
    body('email')
        .custom(async (email) => {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                throw new Error('El correo electrónico ya está en uso');
            }
        }),
    async (req, res) => {
        const { username, password: passwordPlainText, isAdmin, active, ...rest } = req.body;

        const user = await User.findOne({ username });
     
        if (user) {
            return res.status(400).json({ msg: 'El nombre de usuario ya está en uso' });
        }

        const { errors } = validationResult(req);

        if (errors.length) {
            return res.status(400).send({ msg: 'Hubo errores en la solicitud' });
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(passwordPlainText, salt);

        const newUser = await User.create({ username, password, email: req.body.email,active, ...rest });

        const token = jwt.sign(
            { id: newUser._id, isAdmin: newUser.isAdmin },
            process.env.privateKey
        );

        router.get(
            '/:userId',
            auth,
            mongoIdFromParamValidation('userId'),
            async (req, res) => {
                const { userId } = req.params;
        
                try {
                    if (req.user.id !== userId && !req.user.isAdmin) {
                        return res.status(403).json({ msg: 'No tienes permiso para acceder a este usuario' });
                    }
        
                    
                    const user = await User.findById(userId);
        
                    
                    if (!user) {
                        return res.status(404).json({ msg: 'Usuario no encontrado' });
                    }
        
                    res.json({ user });
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ msg: 'Error interno del servidor' });
                }
            }
        );



        router.put(
            '/:userId',
            auth,
            mongoIdFromParamValidation('userId'),
            validate,
            async (req, res) => {
                const { userId } = req.params;
        
                try {
                    
                    if (req.user.id !== userId && !req.user.isAdmin) {
                        return res.status(403).json({ msg: 'No tienes permiso para actualizar este usuario' });
                    }
        
                   
                    const existingUser = await User.findById(userId);
        
                    if (!existingUser) {
                        return res.status(404).json({ msg: 'Usuario no encontrado' });
                    }
        
                   
                    const updatedUser = await User.findByIdAndUpdate(
                        userId,
                        { $set: req.body }, 
                        { new: true }
                    );
        
                    res.json({ msg: 'Usuario actualizado', user: updatedUser });
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ msg: 'Error interno del servidor' });
                }
            }
        );
        
        res.setHeader('x-auth-token', token);
        res.json({ msg: 'Usuario registrado' });
    }
);

module.exports = router;
