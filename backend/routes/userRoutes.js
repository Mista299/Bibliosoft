const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken, authorizeRole } = require("../middlewares/auth");

// Registro e inicio de sesión
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logOut);

// Préstamos de libros
router.post("/borrowBook", authenticateToken, authorizeRole(["admin"]), userController.borrowBook); //preestar libro, solo por admin panel

router.get("/borrowBook", authenticateToken, authorizeRole(["admin", "user"]), userController.getBorrowedBooks); //obetener prestamos por userpanel
router.get(
  "/borrowBookA/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  userController.getBorrowedBooksByAdmin
);
 //obtener prestamos por panel de admin

//  Devolver libro
router.post("/returnBook", authenticateToken, authorizeRole(["admin"]), userController.returnBook);

router.post("/extendLoan", authenticateToken, authorizeRole(["admin", "user"]), userController.extendLoan);




// Administración de usuarios (solo admin)
router.get("/", authenticateToken, authorizeRole(["admin"]), userController.getAllUsers);
router.put("/:id/name", authenticateToken, authorizeRole(["admin"]), userController.updateName);
router.put("/:id/email", authenticateToken, authorizeRole(["admin"]), userController.updateEmail);

router.put("/:id/role", authenticateToken, authorizeRole(["admin"]), userController.updateRole);

router.delete("/:id", authenticateToken, authorizeRole(["admin"]), userController.deleteUser);
// 🚨 Endpoint temporal para crear un admin manualmente
router.post("/create-admin-temp", userController.createUser);


module.exports = router;
