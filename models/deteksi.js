const mongoose = require("mongoose")

const timestamps = {
    timestamps : true
}

const questionSchema = new mongoose.Schema({
    question : String,
    score: Number
})

const deteksiSchema = new mongoose.Schema({
    user : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    questions : [questionSchema],
    totalScore : Number
}, timestamps)

const DeteksiModel = mongoose.model('deteksi', deteksiSchema)
module.exports = DeteksiModel
