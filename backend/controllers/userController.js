const userService = require('../services/userService');

// ==================== AUTENTICACIÓN ====================

// Crear usuario (admin)
const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.json({ success: true, user: newUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al crear usuario' });
  }
};

// Registro de usuario (público)
const registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al registrar usuario' });
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.json({ success: true, token });
  } catch (err) {
    res.status(401).json({ success: false, message: 'Credenciales inválidas' });
  }
};

// Logout de usuario
const logOut = (req, res) => {
  res.json({ success: true, message: 'Sesión cerrada' });
};

// ==================== PANEL DE USUARIO ====================

const getUserPanel = async (req, res) => {
  res.json({ success: true, message: "Panel de usuario cargado" });
};

const getUserLoans = async (req, res) => {
  try {
    const loans = await userService.getUserLoans(req.userId);
    res.json({ success: true, loans });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al obtener préstamos' });
  }
};

const extendLoan = async (req, res) => {
  try {
    const { bookId } = req.body;
    const updatedLoan = await userService.extendLoan(req.userId, bookId);
    res.json({ success: true, loan: updatedLoan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getSettings = async (req, res) => {
  try {
    const settings = await userService.getSettings(req.userId);
    res.json({ success: true, settings });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al obtener configuración' });
  }
};

// ==================== PANEL DE ADMIN ====================

const getAdminPanel = async (req, res) => {
  res.json({ success: true, message: "Panel de administrador cargado" });
};

// ==================== INFORMACIÓN DE USUARIO ====================

const getUserName = async (req, res) => {
  try {
    const name = await userService.getUserName(req.userId);
    res.json({ success: true, name });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al obtener nombre' });
  }
};

const getUserEmail = async (req, res) => {
  try {
    const email = await userService.getUserEmail(req.userId);
    res.json({ success: true, email });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al obtener email' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al obtener usuarios' });
  }
};

// ==================== ACTUALIZACIONES DE PERFIL ====================

const updateName = async (req, res) => {
  try {
    const updatedUser = await userService.updateName(req.userId, req.body.name);
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al actualizar nombre' });
  }
};

const updateEmail = async (req, res) => {
  try {
    const updatedUser = await userService.updateEmail(req.userId, req.body.email);
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al actualizar email' });
  }
};

const updatePassword = async (req, res) => {
  try {
    const updatedUser = await userService.updatePassword(req.userId, req.body.password);
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al actualizar contraseña' });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.userId);
    res.json({ success: true, message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al eliminar usuario' });
  }
};

// ==================== PUT (MODIFICACIONES DIRECTAS) ====================

const putName = async (req, res) => {
  try {
    const updatedUser = await userService.putName(req.userId, req.body.name);
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al modificar nombre' });
  }
};

const putEmail = async (req, res) => {
  try {
    const updatedUser = await userService.putEmail(req.userId, req.body.email);
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al modificar email' });
  }
};

const putPassword = async (req, res) => {
  try {
    const updatedUser = await userService.putPassword(req.userId, req.body.password);
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al modificar contraseña' });
  }
};

// ==================== PRÉSTAMOS ====================

const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const loan = await userService.borrowBook(req.userId, bookId);
    res.json({ success: true, loan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getBorrowedBooks = async (req, res) => {
  try {
    const books = await userService.getBorrowedBooks(req.userId);
    res.json({ success: true, books });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al obtener libros prestados' });
  }
};

// ==================== EXPORTACIÓN ====================

module.exports = {
  createUser,
  registerUser,
  loginUser,
  logOut,
  getUserPanel,
  getUserLoans,
  extendLoan,
  getSettings,
  getAdminPanel,
  getUserName,
  getUserEmail,
  getAllUsers,
  updateName,
  updateEmail,
  updatePassword,
  deleteUser,
  putName,
  putEmail,
  putPassword,
  borrowBook,
  getBorrowedBooks
};
