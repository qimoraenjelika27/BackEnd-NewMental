const router = require('express').Router()
const { DeteksiController, AuthController } = require('../controllers')

// admin only
router.patch('/edit-dokumentasi/:id', AuthController.authenticationJWT, DeteksiController.updateDeteksi)
router.delete('/delete-dokumentasi/:id', AuthController.authenticationJWT, DeteksiController.deleteDeteksi)
router.post('/add-dokumentasi',  AuthController.authenticationJWT, DeteksiController.postDeteksi)

// admin, user, and non user
router.get('/:id', DeteksiController.getDeteksiById)
router.get('/', DeteksiController.getDeteksi)

module.exports = router