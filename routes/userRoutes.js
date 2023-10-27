const express = require('express');
const {getAllUsers, loginUser, currentUser, registerUser, logoutUser,  } = require('../controllers/userController');
const validateToken = require('../middleware/validateToken');
const router = express.Router();



router.route('/').get(getAllUsers)
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.get('/logout', validateToken,logoutUser);
router.get('/current',validateToken, currentUser);


module.exports = router;