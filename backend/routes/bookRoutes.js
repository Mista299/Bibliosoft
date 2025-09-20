const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Crear libro
router.post("/", bookController.createBook);

// Obtener todos los libros
router.get("/", bookController.getAllBooks);

// Eliminar libro
router.delete("/:id", bookController.deleteBook); // 👈 aquí debe existir

module.exports = router;
