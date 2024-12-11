const express = require('express');
const multer = require('multer');
const upload = multer();
const router = express.Router();
const BookController = require('../controllers/bookController.js');

router.post('/books', upload.single('cover'), BookController.create);
router.get('/books/:id', BookController.get);
router.get('/books', BookController.index);
router.put('/books/:id', BookController.update);
router.delete('/books/:id', BookController.delete);

module.exports = router;