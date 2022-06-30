const router = require('express').Router()
const { PaketController, AuthController } = require('../controllers')

// admin only
router.patch('/edit-paket/:id', AuthController.authenticationJWT, PaketController.updatePaket)
router.delete('/delete-paket/:id', AuthController.authenticationJWT, PaketController.deletePaket)
router.post('/add-paket',  AuthController.authenticationJWT, PaketController.postPaket)

// admin, user, psikolog and non user
router.get('/:id', PaketController.getPaketById)
router.get('/', PaketController.getPaket)

module.exports = router