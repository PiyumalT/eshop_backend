const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require("mongoose");
const { expressjwt: jwt } = require("express-jwt");
const errorHandler = require('./helpers/error-handler');
const authJwt = require('./helpers/jwt'); 

//
require('dotenv/config');
// require('dotenv').config();

//enable cross origin resource sharing
const crossOrigin = require('cors');
app.use(crossOrigin());
app.options('*', crossOrigin());

//environment variable
const api = process.env.API_URL;

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());  // enable this line if you want to use jwt
app.use(errorHandler);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// app.use(api, jwt({ secret: secret, algorithms: ["HS256"]}));


//routers
const genaral_router = require('./routers/genaral_router');
const products_router = require('./routers/products_router');
const category_router = require('./routers/category_router');
const users_router = require('./routers/users_router');
const shippingAddress_router = require('./routers/shippingAddress_router');
const orders_router = require('./routers/orders_router');

app.use(`${api}/products`, products_router);
app.use(`${api}/`, genaral_router);
app.use(`${api}/category`, category_router);
app.use(`${api}/users`, users_router);
app.use(`${api}/shippingAddress`, shippingAddress_router);
app.use(`${api}/orders`, orders_router);


//mongo database connection
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'e_shop'
})
.then(() => {
    console.log('Database Connected');
})
.catch((err) => {
    console.log(err);
})

//Node server
app.listen(3000, () => {
    const now = new Date();
    const currentTime = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    console.log(currentTime + ' :: Server running port:3000');
});