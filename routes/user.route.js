const router = require('express').Router()
const { UserController, AuthController } = require('../controllers')

// login
router.post('/login', AuthController.loginUser)

// user
router.post('/register', UserController.registerUser)
router.patch('/update-user/:id', AuthController.authenticationJWT, UserController.updateUser)
router.patch('/password-user/:id', AuthController.authenticationJWT, UserController.updatePassword)
router.get('/list-psikolog', AuthController.authenticationJWT, UserController.getUsers)
router.get('/list-psikolog/:id', AuthController.authenticationJWT, UserController.getUserById)

module.exports = router