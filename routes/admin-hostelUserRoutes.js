const express = require('express');
const {getAllAdmin, loginAdmin, currentUser, registerAdmin,  } = require('../controllers/admin-hostelUserController');
const validateToken = require('../middleware/validateToken');
const router = express.Router();



router.route('/').get(getAllAdmin)
router.route('/login').post(loginAdmin);
router.route('/register').post(registerAdmin);
router.get('/current',validateToken, currentUser);


module.exports = router;