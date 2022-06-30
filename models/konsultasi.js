const mongoose = require("mongoose")
const { phoneValidator, emailValidator } = require('./validators')

const timestamps = {
    timestamps : true
}
const konsultasiSchema = new mongoose.Schema({
    name: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    psikolog : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    gender: {
        type: String,
        enum: ["laki-laki", "perempuan"],
        lowercase : true,
        required: [true, 'jenis kelamin wajib diisi']
    },
    date: {
        type: Date,
        required: [true, 'tanggal wajib diisi']
    },
    no_hp: {
        type: String,
        required : [true, 'phone number is required'],
        validate : [phoneValidator, 'nomor telepon tidak valid'],
        match : [/\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/, 'nomor telepon tidak valid']
    },
    email: {
        type: String,
        required: [true, 'email wajib diisi'],
        unique: false,
        validate : [emailValidator, 'email tidak valid'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email tidak valid']
    },
    email_Ortu: {
        type: String,
        required: [true, 'email orang tua wajib diisi'],
        unique: false,
        validate : [emailValidator, 'email orang tua tidak valid'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email tidak valid']
    },
    keluhan: {
        type: String,
        required: [true, 'keluhan wajib diisi']
    }
}, timestamps)

const KonsultasiModel = mongoose.model('konsultasi', konsultasiSchema)
module.exports = KonsultasiModel