const mongoose = require('mongoose');


//create and define user scema/model
const userschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: {unique: true}
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
});

const user = module.exports = mongoose.model('user', userschema);
