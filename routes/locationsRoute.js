const express = require('express');
const {getHostels, getRooms , getHostelByName, getRoomById} = require('../controllers/locationController');
const router = express.Router();



router.route("/getHostels/").get(getHostels)
router.route("/getHostel/:id").get(getHostelByName)
router.route("/getRooms/:hostelname").get(getRooms);
router.route("/getRoom/:id").get(getRoomById);

module.exports = router;