const express = require('express');
const {getRooms, getRoom, createRoom, updateRoom, deleteRoom } = require('../controllers/admin-hostelRoomController');
const router = express.Router();



router.route('/').get(getRooms)
router.route('/:id').get(getRoom)
router.route('/').post(createRoom)
router.route('/:id').put(updateRoom)
router.route('/:id').delete(deleteRoom)

module.exports = router;