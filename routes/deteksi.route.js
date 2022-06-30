const router = require('express').Router()
const { DeteksiController, AuthController } = require('../controllers')

// admin only
router.patch('/edit-deteksi/:id', AuthController.authenticationJWT, DeteksiController.updateDeteksi)
router.delete('/delete-deteksi/:id', AuthController.authenticationJWT, DeteksiController.deleteDeteksi)
router.post('/add-deteksi',  AuthController.authenticationJWT, DeteksiController.postDeteksi)

// admin, user, and non user
router.get('/:id', DeteksiController.getDeteksiById)
router.get('/', DeteksiController.getDeteksi)

module.exports = router