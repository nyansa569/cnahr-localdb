const express = require('express');
const {getBooking, getBookings, createBooking, deleteBooking } = require('../controllers/bookingController');
const router = express.Router();



router.route('/').get(getBookings)
router.route('/:id').get(getBooking);
router.route('/').post(createBooking);
router.route('/:id').delete(deleteBooking);

module.exports = router;