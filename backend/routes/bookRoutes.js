const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const userController = require("../controllers/userController");
const { authenticateToken, authorizeRole } = require("../middlewares/auth");

// Crear libro
router.post("/", authenticateToken, authorizeRole(["admin"]), bookController.createBook);

// Obtener todos los libros
router.get("/", authenticateToken, authorizeRole(["user", "admin"]), bookController.getAllBooks);

// Eliminar libro
router.delete("/:isbn", authenticateToken, authorizeRole(["admin"]), bookController.deleteBook);

//Editar libro
router.put("/:isbn", authenticateToken, authorizeRole(["admin"]), bookController.updateBook);

// Préstamos de libros
router.post("/borrowBook", authenticateToken, authorizeRole(["admin"]), userController.borrowBook);
router.get("/borrowBook", authenticateToken, authorizeRole(["admin"]), userController.getBorrowedBooks);

// (opcional) Extender préstamo
// router.put("/api/extend-loan/:bookId", authenticateToken, authorizeRole(["user","admin"]), userController.extendLoan);

module.exports = router;
