const Book = require('../models/bookModel');
const uploadFile = require('../fileUploader')


const BookController = {
    async create(req, res){
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            user_id: req.user.userId
        })
        try{
            if(req.file){
                const url = await uploadFile(req.file)
                book.cover = url;
            }
            const newBook = await book.save();
            res.status(201).json(newBook);
        } catch(err){
            res.status(400).json({ message: err.message });
        }
    },
    async get(req, res){
        const { id } = req.params;
        const user_id = req.user.userId;
        try{
            const book = await Book.findOne({ user_id: user_id, _id: id});
            res.status(200).json(book);
        } catch(err) {
            res.status(500).json({ message: err.message });
        }
    },
    async index(req, res){
        const { field, direction } = req.query;
        const user_id = req.user.userId;
        try{
            let books;
            if(field == "endDate"){
                books = await Book.find({user_id}).sort({ endDate: direction });
            }
            else{
                books = await Book.find({user_id}).sort({ startDate: direction });
            }
            res.json(books);
        } catch(err){
            res.status(500).json({ message: err.message });
        }
    },
    async update(req, res){
        const { id } = req.params;
        const user_id = req.user.userId;
        try {
            const book = await Book.findOne({ user_id: user_id, _id: id});
            if(req.body.title){
                book.title = req.body.title;
            }
            if(req.body.author){
                book.author = req.body.author;
            }
            const updatedBook = await book.save();
            res.json(updatedBook);
        } catch(err) {
            res.status(500).json({ message: err.message });
        }
    },
    async delete(req, res){
        const user_id = req.user.userId;
        try{
            await Book.findOneAndDelete({ user_id: user_id, _id: req.params.id });
            res.json({ message: "Deleted book" });
        } catch(err){
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = BookController;