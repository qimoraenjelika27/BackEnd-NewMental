const router = require('express').Router()
const { KategoriController, AuthController } = require('../controllers')

// admin only
router.patch('/edit-kategori/:id', AuthController.authenticationJWT, KategoriController.updateKategori)
router.delete('/delete-kategori/:id', AuthController.authenticationJWT, KategoriController.deleteKategori)
router.post('/add-kategori',  AuthController.authenticationJWT, KategoriController.postKategori)

// admin, user, and non user
router.get('/:id', KategoriController.getKategoriById)
router.get('/', KategoriController.getKategori)

module.exports = router