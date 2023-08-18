const express = require('express');
const {getAllUsers, loginUser, currentUser, registerUser,  } = require('../controllers/userController');
const validateToken = require('../middleware/validateToken');
const router = express.Router();



router.route('/').get(getAllUsers)
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.get('/current',validateToken, currentUser);


module.exports = router;