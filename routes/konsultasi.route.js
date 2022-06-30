const router = require('express').Router()
const { KonsultasiController, AuthController } = require('../controllers')

// admin only
router.patch('/edit-konsultasi/:id', AuthController.authenticationJWT, KonsultasiController.updateKonsultasi)
router.delete('/delete-konsultasi/:id', AuthController.authenticationJWT, KonsultasiController.deleteKonsultasi)
router.post('/add-konsultasi',  AuthController.authenticationJWT, KonsultasiController.postKonsultasi)

// admin, user, psikolog and non user
router.get('/:id', KonsultasiController.getKonsultasiById)
router.get('/', KonsultasiController.getKonsultasi)

module.exports = router