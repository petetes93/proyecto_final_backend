const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { User } = require('../models/user');

const router = Router();

router.post('/login', async (req, res) => {
    const { username, password: passwordPlainText } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({ msg: 'Usuario o contraseña incorrecto' });
    }

    const isValidUser = await bcrypt.compare(passwordPlainText, user.password);

    if (!isValidUser) {
        return res.status(400).json({ msg: 'Usuario o contraseña incorrecto' });
    }

    const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.privateKey
    );

    res.setHeader('x-auth-token', token);
    res.json({ msg: 'Usuario logueado' });
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
        const { username, password: passwordPlainText, isAdmin, ...rest } = req.body;

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

        const newUser = await User.create({ username, password, email: req.body.email, ...rest });

        const token = jwt.sign(
            { id: newUser._id, isAdmin: newUser.isAdmin },
            process.env.privateKey
        );

        res.setHeader('x-auth-token', token);
        res.json({ msg: 'Usuario registrado' });
    }
);

module.exports = router;
