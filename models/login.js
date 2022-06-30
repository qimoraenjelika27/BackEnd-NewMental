const mongoose = require("mongoose")
const { emailValidator } = require('./validators')

const timestamps = {
    timestamps : true
}
const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate : emailValidator,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
    }
}, timestamps);


const loginModel = mongoose.model("Login", loginSchema)
module.exports = loginModel