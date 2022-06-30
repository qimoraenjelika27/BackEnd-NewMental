const mongoose = require("mongoose")

const timestamps = {
    timestamps : true
}

const psikologSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'nama wajib diisi']
    },
    spesialis: {
        type: String,
        required : [true, 'spesialis wajib diisi']
    },
    deskripsi: {
        type: String,
        required : [true, 'deskripsi wajib diisi']
    },
    testimoni: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'testimonipsikolog'
        }
    ],
    kategori : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'kategori'
        }
    ],
    gambar: {
        type: String,
        default: "https://www.pinclipart.com/picdir/middle/181-1814767_person-svg-png-icon-free-download-profile-icon.png"
    }
}, timestamps)

const PsikologModel = mongoose.model('psikolog', psikologSchema)
module.exports = PsikologModel