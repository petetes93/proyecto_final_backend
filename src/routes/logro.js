const {logroValidation} = require('../models/logro')
const logroController = require('../controllers/logro')
const mongoIdFromParamValidation = require('../middlewares/mongoIdFromParam')

const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const validate = require('../middlewares/validate')

const {Router} = require('express')
const router = Router()



router.get(
    '/',
   
    validate,
    logroController.getAll
)

router.get(
    '/:logroId',
    mongoIdFromParamValidation('logroId'),
    logroController.getById
)

router.post('/',auth, logroValidation, validate, logroController.create)

router.put(
    '/:logroId',
    auth,
    mongoIdFromParamValidation('logroId'),
    logroValidation,
    validate,
    logroController.update,
)


router.delete(
    '/:logroId', 
    auth,
    admin,
    mongoIdFromParamValidation('logroId'),
    logroController.remove
)


module.exports = router
