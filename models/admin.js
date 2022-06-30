const mongoose = require("mongoose")

const timestamps = {
    timestamps : true
}
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    }
}, timestamps)

const AdminModel = mongoose.model('Admin', adminSchema)
module.exports = AdminModel