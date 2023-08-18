const express = require('express');
const {getHostels, getRooms } = require('../controllers/locationController');
const router = express.Router();



router.route("/getHostels/:schoolname").get(getHostels)
router.route("/getRooms/:hostelname").get(getRooms);

module.exports = router;