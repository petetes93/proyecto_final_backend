require('express-async-errors')
const {json} = require('express')
const morgan = require('morgan')
const cors = require('cors')


module.exports = function (app) {

    app.use(json())
    app.use(morgan('dev'))
    app.use(cors())
    
    app.use('/api/users', require('../routes/users'))
    app.use('/api/juego', require('../routes/juego'))
    app.use('/api/logro', require('../routes/logro'))

    app.get('/ping', (req, res)=>{
        res.send({success: true})
    })

    app.use(require('../middlewares/errors'))

}