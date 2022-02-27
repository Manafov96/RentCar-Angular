const express = require('express');

const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://selvi:selvi1677@cluster0.bctly.mongodb.net/rentCar?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true }).then( () => {
    console.log('Connected')
}).catch(err => console.log(err));

app.use(cors());
app.use(bodyparser.json());

const userRoutes = require('./user');
const adminRoutes = require('./admin');

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;