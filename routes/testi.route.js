const router = require('express').Router()
const { TestimoniController, AuthController } = require('../controllers')

// admin only
router.patch('/edit-pengalaman/:id', AuthController.authenticationJWT, TestimoniController.updateTestimoni)
router.delete('/delete-pengalaman/:id', AuthController.authenticationJWT, TestimoniController.deleteTestimoni)
router.post('/add-pengalaman',  AuthController.authenticationJWT, TestimoniController.postTestimoni)

// admin, user, and non user
router.get('/:id', TestimoniController.getTestimoniById)
router.get('/', TestimoniController.getTestimoni)

module.exports = router