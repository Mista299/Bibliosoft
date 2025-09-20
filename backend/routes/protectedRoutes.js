const express = require('express');
const userController = require('../controllers/userController');
const bookController = require('../controllers/bookController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

const router = express.Router();

// Paneles
router.get('/user-panel', authenticateToken, authorizeRole(['user','admin']), userController.getUserPanel);
router.get('/admin-panel', authenticateToken, authorizeRole(['admin']), userController.getAdminPanel);
router.get('/settings', authenticateToken, authorizeRole(['user','admin']), userController.getSettings);

// Usuario
router.get('/api/user-loans', authenticateToken, authorizeRole(['user','admin']), userController.getUserLoans);
router.get('/api/username', authenticateToken, authorizeRole(['user','admin']), userController.getUserName);
router.get('/api/useremail', authenticateToken, authorizeRole(['user','admin']), userController.getUserEmail);

router.get('/api/users', authenticateToken, authorizeRole(['admin']), userController.getAllUsers);
router.put('/api/users/:id/name', authenticateToken, authorizeRole(['admin']), userController.updateName);
router.put('/api/users/:id/email', authenticateToken, authorizeRole(['admin']), userController.updateEmail);
router.put('/api/updatePassword', authenticateToken, authorizeRole(['user','admin']), userController.updatePassword);
router.delete('/api/users/:id', authenticateToken, authorizeRole(['admin']), userController.deleteUser);

// Actualizaciones propias (usuario autenticado)
router.put('/api/username', authenticateToken, authorizeRole(['user','admin']), userController.putName);
router.put('/api/useremail', authenticateToken, authorizeRole(['user','admin']), userController.putEmail);
router.put('/api/userpass', authenticateToken, authorizeRole(['user','admin']), userController.putPassword);

// Libros
router.get('/api/library-books', authenticateToken, authorizeRole(['user','admin']), bookController.getAllBooks);
router.post('/api/borrowBook', authenticateToken, authorizeRole(['admin']), userController.borrowBook);
router.get('/api/borrowBook', authenticateToken, authorizeRole(['admin']), userController.getBorrowedBooks);
router.put('/api/extend-loan/:bookId', authenticateToken, authorizeRole(['user','admin']), userController.extendLoan);

module.exports = router;
