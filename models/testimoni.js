const mongoose = require("mongoose")

const timestamps = {
    timestamps : true
}
const testimoniSchema = new mongoose.Schema({
    judul: {
        type: String,
        required: [true, 'judul wajib diisi']
    },
    deskripsi: {
        type: String,
        required: [true, 'deskripsi wajib diisi']
    },
    video: {
        type: String,
        default: "https://thumbs.dreamstime.com/z/no-image-vector-isolated-white-background-no-image-vector-illustration-isolated-156298619.jpg"
    },
    problema: {
        type: String,
        required: [true, 'problema wajib diisi']
    }
}, timestamps);


const testimoniModel = mongoose.model("testimoni", testimoniSchema)
module.exports = testimoniModel