const express = require('express');
const {getLocations, getLocation, createLocation, updateLocation, deleteLocation } = require('../controllers/admin-schoolLocationController');
const router = express.Router();



router.route('/').get(getLocations)
router.route('/:id').get(getLocation);
router.route('/').post(createLocation);
router.route('/:id').delete(deleteLocation);
router.route('/:id').put(updateLocation);

module.exports = router;