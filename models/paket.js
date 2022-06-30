const mongoose = require("mongoose")

const timestamps = {
    timestamps : true
}
const paketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'nama paket wajib diisi']
    },
    deskripsi: {
        type: String,
        required : [true, 'deskripsi paket wajib diisi']
    },
    harga: {
        type: String,
        required : [true, 'harga wajib diisi']
    },
}, timestamps)

const PaketModel = mongoose.model('paket', paketSchema)
module.exports = PaketModel