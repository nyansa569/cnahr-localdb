const express = require('express');
const {getBooking, getBookings, createBooking, deleteBooking } = require('../controllers/bookingController');
const validateToken = require('../middleware/validateToken');
const router = express.Router();


router.use(validateToken)
router.get('/',getBookings)
router.get('/:id',getBooking);
router.post('/',createBooking);
router.delete('/:id',deleteBooking);

module.exports = router;