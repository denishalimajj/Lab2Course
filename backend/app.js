const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const authJwt = require('./helper/jwt')
const errHandler = require('./helper/error-handler')

require('dotenv/config')

app.use(cors())
app.options('*', cors())

//Middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
app.use(errHandler)





//Routers
const categoriesRoutes = require('./routes/categories')
const productsRoutes = require('./routes/products')
const usersRoutes = require('./routes/users')
const ordersRoutes = require('./routes/orders')

const api = process.env.API_URL

app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/orders`, ordersRoutes)

//Database connection
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'e-commerce',
    })
    .then(() => {
        console.log('Database Connecting Success')
    })
    .catch((err) => {
        console.log('Connecting lost...')
    })

//Server
app.listen(3000, () => {
    console.log('Server is started now')
})
