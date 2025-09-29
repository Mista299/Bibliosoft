const Book = require("../models/bookModel"); // 👈 IMPORTANTE

class BookService {
  static async create(book) {
    const newBook = new Book(book);
    await newBook.save();
    return newBook; // ✅ para que el controller reciba algo
  }

  static async update(isbn, updates) {
    // updates será un objeto { campo1: valor1, campo2: valor2, ... }

    await Book.updateOne({ isbn: isbn }, { $set: updates });

    const updatedBook = await Book.findOne({ isbn }).lean();
    if (!updatedBook) {
      throw new Error(`Book with ISBN ${isbn} not found`);
    }

    return updatedBook;
  }

  static async getAllBooks() {
    return await Book.find().select("-_id -__v").lean();
  }

  static async delete(isbn) {
    return await Book.deleteOne({ isbn: isbn });
  }
}

module.exports = BookService;
