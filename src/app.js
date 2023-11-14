require('dotenv').config()
const express = require('express')

const app = express()

const port = process.env.PORT || 3001

require('./startup/db')()
require('./startup/routes')(app)

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
