const router = require('express').Router()
const { PaymentController } = require('../controllers')

// // user only
// router.post('/add', PaymentController)

// admin only
router.post('/payment',  PaymentController.Payment)

module.exports = router