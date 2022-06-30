const router = require('express').Router()
const { AdminController, AuthController } = require('../controllers')

// admin only
router.post('/add-users', AuthController.authenticationJWT, AdminController.addUser)
router.get('/list-users', AuthController.authenticationJWT, AdminController.getUsers)
router.get('/users/:id', AuthController.authenticationJWT, AdminController.getUserById)
router.patch('/users/:id', AuthController.authenticationJWT, AdminController.updateUser)
router.patch('/users-password/:id', AuthController.authenticationJWT, AdminController.updatePassword)
router.delete('/users/:id', AuthController.authenticationJWT, AdminController.deleteUser)

module.exports = router