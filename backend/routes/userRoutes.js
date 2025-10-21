const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken, authorizeRole } = require("../middlewares/auth");

// Registro e inicio de sesión
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logOut);

// Préstamos de libros
router.post("/borrowBook", authenticateToken, authorizeRole(["admin"]), userController.borrowBook);
router.get("/borrowBook", authenticateToken, authorizeRole(["admin", "user"]), userController.getBorrowedBooks);
router.get("/borrowBookUser", authenticateToken, authorizeRole(["admin"]), userController.getBorrowedBooksByAdmin);

//  Devolver libro
router.post("/returnBook", authenticateToken, authorizeRole(["admin"]), userController.returnBook);


router.post("/extendLoan", authenticateToken, authorizeRole(["admin", "user"]), userController.extendLoan);




// Perfil de usuario autenticado
router.get("/username", authenticateToken, authorizeRole(["user", "admin"]), userController.getUserName);
router.get("/useremail", authenticateToken, authorizeRole(["user", "admin"]), userController.getUserEmail);

// Actualizaciones propias
router.put("/username", authenticateToken, authorizeRole(["user", "admin"]), userController.putName);
router.put("/useremail", authenticateToken, authorizeRole(["user", "admin"]), userController.putEmail);
router.put("/userpass", authenticateToken, authorizeRole(["user", "admin"]), userController.putPassword);
router.put("/updatePassword", authenticateToken, authorizeRole(["user", "admin"]), userController.updatePassword);

// Administración de usuarios (solo admin)
router.get("/", authenticateToken, authorizeRole(["admin"]), userController.getAllUsers);
router.put("/:id/name", authenticateToken, authorizeRole(["admin"]), userController.updateName);
router.put("/:id/email", authenticateToken, authorizeRole(["admin"]), userController.updateEmail);
router.delete("/:id", authenticateToken, authorizeRole(["admin"]), userController.deleteUser);
// 🚨 Endpoint temporal para crear un admin manualmente
router.post("/create-admin-temp", userController.createUser);


module.exports = router;
