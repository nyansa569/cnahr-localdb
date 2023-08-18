const express = require('express');
const {getAllNews, getNews, createNews, deleteNews } = require('../controllers/admin-schoolNewsController');
const router = express.Router();



router.route('/').get(getAllNews)
router.route('/:id').get(getNews);
router.route('/').post(createNews);
router.route('/:id').delete(deleteNews);

module.exports = router;