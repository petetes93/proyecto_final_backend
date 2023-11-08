const {juegoValidation} = require('../models/juego')
const juegoController = require('../controllers/juego')
const mongoIdFromParamValidation = require('../middlewares/mongoIdFromParam')

const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const validate = require('../middlewares/validate')

const {Router} = require('express')
const router = Router()

const {query} = require('express-validator')

router.get(
    '/',
    query('page').isInt().optional(),
    query('order').isIn(['title', 'platform']).optional(),
    validate,
    juegoController.getAll
)

router.get(
    '/:gameId',  
    mongoIdFromParamValidation('gameId'),
    juegoController.getById
);

router.post('/', auth, juegoValidation, validate, juegoController.create)
router.put(
	'/:gameId',
	auth,
	mongoIdFromParamValidation('gameId'),
	juegoValidation,
	validate,
	juegoController.update
)
router.delete(
	'/:gameId',
	auth,
	admin,
	mongoIdFromParamValidation('gameId'),
	juegoController.remove
)