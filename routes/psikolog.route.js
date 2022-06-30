const router = require('express').Router()
const { PsikologController, AuthController } = require('../controllers')

// admin only
router.patch('/edit-psikolog/:id', AuthController.authenticationJWT, PsikologController.updatePsikolog)
router.delete('/delete-psikolog/:id', AuthController.authenticationJWT, PsikologController.deletePsikolog)
router.post('/add-psikolog',  AuthController.authenticationJWT, PsikologController.postPsikolog)

// admin, user, and non user
router.get('/:id', PsikologController.getPsikologById)
router.get('/', PsikologController.getPsikolog)

module.exports = router