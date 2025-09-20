// services/userService.js
const User = require('../models/userModel');
const Book = require('../models/bookModel');

/**
 * Buscar un usuario por su ID
 */
const getUserBy_Id = async (id) => {
  return await User.findById(id).select('-password'); // no devolver la contraseña
};

/**
 * Obtener los libros prestados por un usuario
 */
const getBorrowedBooks = async (userId) => {
  const user = await User.findById(userId).populate('borrowedBooks.bookId');
  if (!user) throw new Error('Usuario no encontrado');
  return user.borrowedBooks;
};

/**
 * Extender el préstamo de un libro (máx. 2 veces, como definiste antes)
 */
const extendLoan = async (userId, bookId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  const loan = user.borrowedBooks.find(b => b.bookId.toString() === bookId);
  if (!loan) throw new Error('Préstamo no encontrado');

  if (loan.extensions >= 2) {
    throw new Error('Ya no puedes extender más este préstamo');
  }

  loan.returnDate.setDate(loan.returnDate.getDate() + 7); // extiende 7 días
  loan.extensions += 1;

  await user.save();
  return loan;
};

/**
 * Prestar un libro a un usuario
 */
const borrowBook = async (userId, bookId) => {
  const user = await User.findById(userId);
  const book = await Book.findById(bookId);

  if (!user) throw new Error('Usuario no encontrado');
  if (!book) throw new Error('Libro no encontrado');
  if (book.copiesAvailable < 1) throw new Error('No hay copias disponibles');

  book.copiesAvailable -= 1;
  await book.save();

  user.borrowedBooks.push({
    bookId: book._id,
    title: book.title,
    borrowedDate: new Date(),
    returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
    extensions: 0
  });

  await user.save();
  return { user, book };
};

module.exports = {
  getUserBy_Id,
  getBorrowedBooks,
  extendLoan,
  borrowBook
};
