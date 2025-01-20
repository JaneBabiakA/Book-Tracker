const express = require('express');
const auth = require("./../auth.js");
const multer = require('multer');
const upload = multer();
const router = express.Router();
const UserController = require('../controllers/userController.js');
const BookController = require('../controllers/bookController.js');

router.post("/users/register", UserController.create);
router.post("/users/login", UserController.login);

//router.post('/books', auth, upload.single('cover'), BookController.create);
router.get('/books/:id', auth, BookController.get);
router.get('/books', auth, BookController.index);
router.put('/books/:id', auth, BookController.update);
router.delete('/books/:id', auth, BookController.delete);

module.exports = router;