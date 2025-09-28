const Book = require('../models/bookModel');

class BookService {
  static async create(book) {
    const newBook = new Book(book);
    await newBook.save();
  }

  static async update(isbn, prop, value) {
    const update = {};
    update[prop] = value;

    await Book.updateOne({ isbn: isbn }, { $set: update });

    const updatedBook = await Book.findOne({ isbn }).lean();
    if (!updatedBook) {
      throw new Error(`Book with ISBN ${isbn} not found`);
    }

    return updatedBook;
  }

  static async getAllBooks() {
    try {
      // ✅ Obtiene todos los libros sin los campos internos de MongoDB
      return await Book.find().select("-_id -__v").lean();
    } catch (error) {
      throw new Error("Error fetching books: " + error.message);
    }
  }

  static async deleteAll() {
    await Book.deleteMany();
  }

  static async delete(isbn) {
    await Book.deleteOne({ isbn: isbn });
  }
}

module.exports = BookService;
