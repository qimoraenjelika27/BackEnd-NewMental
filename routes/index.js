const router = require('express').Router()
const adminRouter = require('./admin.route')
const kategoriRouter = require('./kategori.route')
const psikologRouter = require('./psikolog.route')
const testiRouter = require('./testi.route')
const userRouter = require('./user.route')
const konsultasiRouter = require('./konsultasi.route')
const paketRouter = require('./paket.route')
const testiPsikologRouter = require('./testiPsikolog.route')
const dokumentasiRouter = require('./dokumentasi.route')
const deteksiRouter = require('./deteksi.route')
const paymentRouter = require('./payment.route')

router.get("/", (req, res) => {
    res.status(200).send('Hello, welcome to cure.it API')
})

router.use('/kategori', kategoriRouter)
router.use('/psikolog', psikologRouter)
router.use('/pengalaman', testiRouter)
router.use('/konsultasi', konsultasiRouter)
router.use('/paket', paketRouter)
router.use('/testimoni', testiPsikologRouter)
router.use('/dokumentasi', dokumentasiRouter)
router.use('/deteksi', deteksiRouter)

router.use(adminRouter)
router.use(userRouter)
router.use(paymentRouter)

module.exports = router