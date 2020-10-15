const mongoose = require('mongoose');


//create and define user_role scema/model
const user_roleschema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    role_name: {
        type: String,
        default : "admin",
        required: true
    },
});

const user_role = module.exports = mongoose.model('user_role', user_roleschema);
