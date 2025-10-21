const Book = require("../models/bookModel");

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
  // static async lendBook(isbn, userId) {
  //   const User = require("../models/userModel"); // 👈 Importamos aquí para evitar dependencias circulares

  //   // Buscar el libro por su ISBN
  //   const book = await Book.findOne({ isbn });
  //   if (!book) {
  //     throw new Error(`No se encontró un libro con ISBN ${isbn}`);
  //   }

  //   // Verificar si hay copias disponibles
  //   if (book.availableCopies <= 0) {
  //     throw new Error(`No hay copias disponibles del libro "${book.title}"`);
  //   }

  //   // Buscar al usuario
  //   const user = await User.findOne({ id: userId });
  //   if (!user) {
  //     throw new Error(`Usuario con ID ${userId} no encontrado`);
  //   }

  //   // Verificar si el usuario ya tiene este libro prestado
  //   const alreadyBorrowed = user.borrowedBooks.some(
  //     (b) => b.bookId.toString() === book._id.toString()
  //   );
  //   if (alreadyBorrowed) {
  //     throw new Error(`El usuario ya tiene este libro prestado`);
  //   }

  //   // Actualizar datos
  //   user.borrowedBooks.push({
  //     bookId: book._id,
  //     title: book.title,
  //     borrowedDate: new Date(),
  //     returnDate: null,
  //     extensions: 0,
  //   });

  //   book.availableCopies -= 1;

  //   // Guardar cambios
  //   await user.save();
  //   await book.save();

  //   return {
  //     message: `Libro "${book.title}" prestado exitosamente a ${user.name}`,
  //     user: user.name,
  //     book: book.title,
  //   };
  // }
  // static async returnBook(userId, bookId) {
  //   // 1️⃣ Buscar el usuario
  //   const user = await User.findById(userId);
  //   if (!user) throw new Error("Usuario no encontrado");

  //   // 2️⃣ Buscar el libro en su lista de préstamos
  //   const borrowedBook = user.borrowedBooks.find(
  //     (b) => b.bookId.toString() === bookId.toString()
  //   );

  //   if (!borrowedBook) throw new Error("El libro no está registrado como prestado por este usuario");

  //   // 3️⃣ Registrar la fecha real de devolución
  //   borrowedBook.actualReturnDate = new Date();

  //   // 4️⃣ Eliminar el libro del array de préstamos activos
  //   user.borrowedBooks = user.borrowedBooks.filter(
  //     (b) => b.bookId.toString() !== bookId.toString()
  //   );

  //   // 5️⃣ Guardar los cambios
  //   await user.save();

  //   // 6️⃣ (Opcional) Actualizar disponibilidad del libro
  //   await Book.updateOne({ _id: bookId }, { $set: { available: true } });

  //   return { message: "Libro devuelto exitosamente" };
  // }

}

module.exports = BookService;
