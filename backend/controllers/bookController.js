const Book = require('../models/bookModel');
const uploadFile = require('../fileUploader')


const BookController = {
    async create(req, res){
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        })
        try{
            if(req.file){
                const url = await uploadFile(req.file)
                book.cover = url;
            }
            const newBook = await book.save();
            res.status(201).json(newBook);
        } catch(err){
            console.log(err.message);
            res.status(400).json({ message: err.message });
        }
    },
    async get(req, res){
        const { id } = req.params;
        try{
            const book = await Book.findById(id);
            res.status(200).json(book);
        } catch(err) {
            console.log(err.message);
            res.status(500).json({ message: err.message });
        }
    },
    async index(req, res){
        try{
            const books = await Book.find();
            res.json(books);
        } catch(err){
            res.status(500).json({ message: err.message });
        }
    },
    async update(req, res){
        const { id } = req.params;
        const book = await Book.findById(id);
        if(req.body.title){
            book.title = req.body.title;
        }
        if(req.body.author){
            book.author = req.body.author;
        }
        try {
            const updatedBook = await book.save();
            res.json(updatedBook);
        } catch(err) {
            res.status(500).json({ message: err.message });
        }
    },
    async delete(req, res){
        try{
            await Book.findOneAndDelete({ _id: req.params.id });
            res.json({ message: "Deleted book" });
        } catch(err){
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = BookController;