const bookService = require('../services/bookService');

// Crear libro
const createBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    res.json({ success: true, message: "Libro creado correctamente", book });
  } catch (error) {
    console.error("Error creando libro:", error.message);
    res.status(500).json({ success: false, message: "Error creando libro" });
  }
};

// Obtener todos los libros
const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json({ success: true, books });
  } catch (error) {
    console.error("Error obteniendo libros:", error.message);
    res.status(500).json({ success: false, message: "Error obteniendo libros" });
  }
};

// Eliminar libro
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await bookService.deleteBook(id);
    res.json({ success: true, message: `Libro con id ${id} eliminado` });
  } catch (error) {
    console.error("Error eliminando libro:", error.message);
    res.status(500).json({ success: false, message: "Error eliminando libro" });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  deleteBook
};
