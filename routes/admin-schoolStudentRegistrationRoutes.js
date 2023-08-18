const express = require('express');
const {getAllStudents, registerStudent, deleteStudent, currentStudent , getStudent} = require('../controllers/admin-schoolStudentRegistrationController');
const validateToken = require('../middleware/validateToken');
const router = express.Router();



router.route('/').get(getAllStudents);
router.route('/:id').get(getStudent);
router.route('/').post(registerStudent);
router.route('/:id').delete(deleteStudent);
router.get('/current',validateToken, currentStudent);


module.exports = router;