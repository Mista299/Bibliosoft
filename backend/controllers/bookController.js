const bookService = require('../services/bookService');

// Crear libro
const createBook = async (req, res) => {
  try {
    const book = await bookService.create(req.body); // ✅ no createBook
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
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar libro
const deleteBook = async (req, res) => {
  try {
    const { isbn } = req.params;
    await bookService.delete(isbn);
    res.json({ success: true, message: `Libro con isbn ${isbn} eliminado` });
  } catch (error) {
    console.error("Error eliminando libro:", error.message);
    res.status(500).json({ success: false, message: "Error eliminando libro" });
  }  
};

const updateBook = async (req, res) => {
  try {
    const { isbn } = req.params;      // ISBN del libro que quiero actualizar
    const updates = req.body;         // Objeto con los campos a cambiar

    const updatedBook = await bookService.update(isbn, updates);

    res.json({ success: true, book: updatedBook });
  } catch (error) {
    console.error("Error actualizando libro:", error.message);
    res.status(500).json({ success: false, message: "Error actualizando libro" });
  }
};



module.exports = {
  createBook,
  getAllBooks,
  deleteBook,
  updateBook
};
