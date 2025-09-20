const Book = require('../models/bookModel');

// Crear libro
const createBook = async (bookData) => {
  const book = new Book(bookData);
  return await book.save();
};

// Obtener todos los libros
const getAllBooks = async () => {
  return await Book.find();
};

// Eliminar libro
const deleteBook = async (id) => {
  return await Book.findByIdAndDelete(id);
};

module.exports = {
  createBook,
  getAllBooks,
  deleteBook
};
