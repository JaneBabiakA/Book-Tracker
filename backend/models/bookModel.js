const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    cover: {
        type: String
    },
    user_id: {
        type: String,
        required: true
    }
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;