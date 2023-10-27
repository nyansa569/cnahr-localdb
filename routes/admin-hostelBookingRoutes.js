const express = require('express');
const { getBookings,getBooking, acceptBooking,declineBooking } = require('../controllers/admin-hostelBookingController');

const router = express.Router();



router.route('/').get(getBookings)
router.route('/:id').get(getBooking)
router.route('/accept/:id/').put(acceptBooking)
router.route('/decline/:id/').put(declineBooking)


module.exports = router;