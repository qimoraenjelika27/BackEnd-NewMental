const mongoose = require("mongoose")
const { emailValidator, passwordValidator, phoneValidator } = require('./validators')

const msg = 'Password must contain at least 8 characters and a combination of uppercase, lowercase and numbers'

const timestamps = {
    timestamps : true
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'nama wajib diisi']
    },
    email: {
        type: String,
        required: [true, 'email wajib diisi'],
        unique: true,
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
    no_hp: {
        type: String,
        required : [true, 'nomor telepon wajib diisi'],
        unique : true,
        validate : phoneValidator,
        match : /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/
    },
    password: {
        type: String,
        required: [true, 'password wajib diisi'],
        validate : [passwordValidator, msg],
        match : [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, msg]
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        lowercase : true,
        required: [true, 'jenis kelamin wajib diisi']
    },
    birthdate: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'psikolog'],
        lowercase : true,
        required: true
    },
    profpic: {
        type: String,
        default: "https://www.pinclipart.com/picdir/middle/181-1814767_person-svg-png-icon-free-download-profile-icon.png"
    },
    member: {
        type: String,
        enum: ["paket 1", "not member", "paket 2", "paket 3", "paket trial"],
        lowercase : true,
        required: [true, 'member wajib diisi']
    },
    jadwalKonsultasi: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'konsultasis'
        }
    ],
    hasilDeteksi: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'deteksis'
        }
    ]
}, timestamps)

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel