const User = require('../models/userModel');
const Book = require('../models/bookModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Crear un nuevo usuario
exports.createUser = async (uss) => {

    try {
        console.log('Intentando crear un nuevo usuario EN userservice con:', uss);
        const newUser = new User(uss); // Añadir un password por defecto si es necesario
        await newUser.save();
        console.log('Usuario creado exitosamente en el servicio:', newUser);
        return newUser;
    } catch (error) {
        console.error('Error al crear el usuario en el servicio:', error.message);
        throw new Error(error.message);
    }
};


// Función para registrar un nuevo usuario
exports.registerUser = async (userData) => {
    try {
        const { email } = userData;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        console.error('Error registering user in service:', error.message);
        throw new Error(error.message);
    }
};
exports.loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        const role = user.role;
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        console.log("usuario encontrado: ")
        console.log(user)
        return user;
    } catch (error) {
        console.error('Error logging in user in service:', error.message);
        throw new Error('Error logging in user in service');
    }
};
exports.getAllUsers = async () => {
    return await User.find({}, { password: 0, __v: 0, _id: 0 }).lean();
  };
  
// Actualizar el nombre de un usuario por ID
exports.updateName = async (id, name) => {
    return await User.findOneAndUpdate({ id }, { name }, { new: true });
};

// Actualizar el email de un usuario por ID
exports.updateEmail = async (id, email) => {
    return await User.findOneAndUpdate({ id }, { email }, { new: true });
};

// Actualizar la contraseña de usuario
exports.updatePassword = async (id, password) => {
    console.log("-----Entrnado a userService-----")
    return await User.findByIdAndUpdate(id, { password }, { new: true });
};
//------------------actuializar datos solo con autenticacion:------------------------------//
// Función para actualizar el nombre de usuario
exports.putUserName = async (userId, newName) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Usuario no encontrado.');
        }
        user.name = newName;
        await user.save();
    } catch (error) {
        throw new Error('Error actualizando el nombre de usuario.');
    }
  };
  
  // Función para actualizar el correo electrónico
exports.putUserEmail = async (userId, newEmail) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Usuario no encontrado.');
        }
  
        user.email = newEmail;
        await user.save();
    } catch (error) {
        throw new Error('Error actualizando el correo electrónico.');
    }
  };
  
  // Función para actualizar la contraseña
  exports.putUserPassword = async (userId, newPassword) => {
    try {
        console.log("--------------Entrando en putUserPassword (userService)-----------------");
        console.log("ID del usuario:", userId);
        console.log("Nueva contraseña recibida:", newPassword);

        const user = await User.findById(userId);
        if (!user) {
            console.error('Usuario no encontrado.');
            throw new Error('Usuario no encontrado.');
        }
        
        console.log("Usuario encontrado:", user);

        if (!newPassword) {
            console.error('Contraseña nueva no válida.');
            throw new Error('Contraseña nueva no válida.');
        }

        console.log("-----Hasheando la nueva contraseña-----");
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log("Contraseña hasheada:", hashedPassword);

        user.password = hashedPassword;
        await user.save();

        console.log("Contraseña actualizada correctamente para el usuario:", userId);
    } catch (error) {
        console.error('Error en putUserPassword:', error);
        throw new Error('Error actualizando la contraseña.');
    }
};

//-------------------------------------------------------------------------------------//
exports.verifyPassword = async (user, currentPassword) => {
    try {
        // Comparar la contraseña ingresada por el usuario con la que está almacenada (que está cifrada)
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        return isMatch; // Retorna true si las contraseñas coinciden, de lo contrario false
    } catch (error) {
        console.error('Error verifying password:', error.message);
        throw new Error('Error verifying password');
    }
};

// Eliminar un usuario por ID
exports.deleteUser = async (id) => {
    try {
        const result = await User.deleteOne({ id });
        return result;
    } catch (error) {
        console.error('Error deleting user in service:', error);
        throw new Error('Error al eliminar el usuario del servidor');
    }
};

// Eliminar todos los usuarios
exports.deleteAllUsers = async () => {
    await User.deleteMany();
};
//obtener un usuario por Id pero solo si se autentica con el token
exports.getUserNameById = async (userId) => {
    try {
        const user = await User.findById(userId); // Asegúrate de tener el modelo User importado
        console.log("Controlador, obteniendo el nombre:")
        console.log(user)

        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user.name;
    } catch (error) {
        throw new Error(`Error al obtener el nombre del usuario: ${error.message}`);
    }
};
//obtener el emanil del usuario pero solo si se autentica con el token
exports.getUserEmailById = async (userId) => {
    try {
        const user = await User.findById(userId); // Asegúrate de tener el modelo User importado
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user.email;
    } catch (error) {
        throw new Error(`Error al obtener el correo electrónico del usuario: ${error.message}`);
    }
};
// Obtener un usuario por ID
exports.getUserBy_Id = async (_id) => {
    try {
        const user = await User.findOne({ _id }, { password: 0, __v: 0 });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error('Error getting user by ID in service:', error.message);
        throw new Error('Error getting user by ID in service');
    }
};
// Obtener los libros prestados por un usuario por _ID
exports.getBorrowedBooks = async (userId) => {
  try {
    // Buscar por _id (que ahora es la cédula)
    const user = await User.findOne({ id: userId }); // si en tu schema el campo se llama "id"

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user.borrowedBooks;
  } catch (error) {
    console.error('Error al obtener libros prestados en el servicio:', error.message);
    throw new Error(`Error al obtener libros prestados en el servicio: ${error.message}`);
  }
};


exports.borrowBook = async (userId, bookIsbn) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1️⃣ Buscar el libro por ISBN
    const book = await Book.findOne({ isbn: bookIsbn }).session(session);
    if (!book) {
      throw new Error("Libro no encontrado.");
    }

    // 2️⃣ Validar disponibilidad
    if (book.availableCopies <= 0) {
      throw new Error("No hay copias disponibles del libro.");
    }

    // 3️⃣ Buscar usuario por su cédula (campo 'id')
    const user = await User.findOne({ id: userId }).session(session);
    if (!user) {
      throw new Error("Usuario no encontrado.");
    }

    // 4️⃣ Restar una copia disponible del libro
    book.availableCopies -= 1;
    await book.save({ session });

    // 5️⃣ Agregar el préstamo al usuario
    user.borrowedBooks.push({
      bookId: book._id.toString(),
      isbn: book.isbn,
      title: book.title,
      borrowedDate: new Date(),
      returnDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 días después
      status: "activo",
      extensionCount: 0
    });

    await user.save({ session });

    // 6️⃣ Confirmar la transacción
    await session.commitTransaction();
    console.log(`📚 Libro "${book.title}" prestado al usuario con cédula ${userId}`);

    return {
      success: true,
      message: "Libro prestado correctamente.",
      borrowedBook: { title: book.title, isbn: book.isbn }
    };

  } catch (error) {
    await session.abortTransaction();
    console.error("❌ Error al prestar el libro:", error.message);
    throw new Error("Error al prestar el libro: " + error.message);
  } finally {
    session.endSession();
  }
};

// Función para buscar un préstamo por bookId
exports.getLoanByBookId = async (userId, bookId) => {
    try {
        const user = await User.findOne({ _id: userId, 'borrowedBooks.bookId': bookId }, { 'borrowedBooks.$': 1 }).exec();
        if (!user || !user.borrowedBooks.length) {
            throw new Error('Préstamo no encontrado');
        }
        
        return user.borrowedBooks[0];
    } catch (error) {
        console.error('Error buscando el préstamo:', error);
        throw error;
    }
}

exports.extendLoanByCedula = async (cedula, isbn) => {
  try {
    const user = await User.findOne({ id: cedula });
    if (!user) throw { status: 404, message: "Usuario no encontrado" };

    const loan = user.borrowedBooks.find(
      (b) => b.isbn === isbn && b.status === "activo"
    );

    if (!loan)
      throw { status: 404, message: "Préstamo activo no encontrado o ya devuelto" };

    if ((loan.extensionCount || 0) >= 2)
      throw { status: 400, message: "Límite máximo de extensiones alcanzado" };

    // Extender el plazo
    const nuevaFecha = new Date(loan.returnDate);
    nuevaFecha.setDate(nuevaFecha.getDate() + 15);

    loan.returnDate = nuevaFecha;
    loan.extensionCount = (loan.extensionCount || 0) + 1;

    await user.save();

    return {
      message: "Préstamo extendido exitosamente",
      isbn: loan.isbn,
      newReturnDate: loan.returnDate,
      extensionCount: loan.extensionCount,
    };
  } catch (error) {
    console.error("Error en extendLoanByCedula:", error);
    // Si el error tiene status definido, lo propagamos tal cual
    if (error.status) throw error;
    // Caso contrario, enviamos un error genérico
    throw { status: 500, message: "Error interno del servidor" };
  }
};
exports.returnBook = async (userId, isbn) => {
  try {
    // Buscar el usuario por su id (cédula)
    const user = await User.findOne({ id: userId });
    if (!user) throw new Error("Usuario no encontrado");

    // Buscar el préstamo activo con ese ISBN
    const borrowedBook = user.borrowedBooks.find(
      (b) => b.isbn === isbn && b.status === "activo"
    );

    if (!borrowedBook) {
      throw new Error("No se encontró un préstamo activo con ese ISBN");
    }

    // Marcar el libro como entregado
    borrowedBook.status = "entregado";
    borrowedBook.actualReturnDate = new Date();

    // Guardar los cambios
    await user.save();

    return {
      message: `El libro '${borrowedBook.title}' fue devuelto correctamente.`,
    };
  } catch (error) {
    console.error("❌ Error en returnBook (userService):", error.message);
    throw new Error(error.message || "Error al devolver el libro");
  }
};

exports.updateRole = async (id, role) => {
  try {
    const user = await User.findOneAndUpdate(
      { id: id },                // tu campo de cédula
      { role: role },            // lo que quieres modificar
      { new: true }              // devuelve actualizado
    );

    return user;
  } catch (err) {
    console.error("Error en updateRole():", err);
    throw err;
  }
};

// // Extender el plazo del préstamo
// exports.extendLoan = async (userId, loanId, newReturnDate) => {
//     try {
//         const user = await User.findOne({ id: userId }).exec();
//         if (user) {
//             const loan = user.borrowedBooks.bookId(loanId); // Busca el préstamo por ID
//             if (loan) {
//                 loan.returnDate = new Date(newReturnDate);
//                 await user.save();
//                 return user.borrowedBooks;
//             } else {
//                 throw new Error('Loan not found');
//             }
//         } else {
//             throw new Error('User not found');
//         }
//     } catch (error) {
//         throw new Error('Error extending loan: ' + error.message);
//     }
// }