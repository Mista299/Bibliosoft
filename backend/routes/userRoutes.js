const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken, authorizeRole } = require("../middlewares/auth");

// Registro e inicio de sesión
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logOut);

// Render de vistas

router.get("/login", (req, res) => {
  res.json({ message: "Login page (frontend debería manejar esto)" });
});

// Perfil de usuario autenticado
router.get("/username", authenticateToken, authorizeRole(["user", "admin"]), userController.getUserName);
router.get("/useremail", authenticateToken, authorizeRole(["user", "admin"]), userController.getUserEmail);

// Actualizaciones propias
router.put("/username", authenticateToken, authorizeRole(["user", "admin"]), userController.putName);
router.put("/useremail", authenticateToken, authorizeRole(["user", "admin"]), userController.putEmail);
router.put("/userpass", authenticateToken, authorizeRole(["user", "admin"]), userController.putPassword);
router.put("/updatePassword", authenticateToken, authorizeRole(["user", "admin"]), userController.updatePassword);

// Administración de usuarios (solo admin)
router.get("/users", authenticateToken, authorizeRole(["admin"]), userController.getAllUsers);
router.put("/users/:id/name", authenticateToken, authorizeRole(["admin"]), userController.updateName);
router.put("/users/:id/email", authenticateToken, authorizeRole(["admin"]), userController.updateEmail);
router.delete("/users/:id", authenticateToken, authorizeRole(["admin"]), userController.deleteUser);

module.exports = router;
