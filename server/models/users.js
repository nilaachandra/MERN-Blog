const mongoose = require('mongoose');
const {Schema, model} = mongoose

const userSchema = new mongoose.Schema({
    username : {type: String, required: true, min: 4, unique : true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true}
})

const userModel = model('User', userSchema)

module.exports = userModel