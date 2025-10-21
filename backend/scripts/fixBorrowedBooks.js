// scripts/fixBorrowedBooks.js
import mongoose from "mongoose";
import User from "../models/User.js"; // ajusta la ruta según tu estructura

const MONGO_URI = "mongodb://127.0.0.1:27017/tu_basededatos"; // cambia por tu conexión real

async function fixBorrowedBooks() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    const result = await User.updateMany(
      { "borrowedBooks.isbn": { $exists: false } },
      { $set: { "borrowedBooks.$[].isbn": "TEMP-UNKNOWN" } }
    );

    console.log(`🔧 Usuarios actualizados: ${result.modifiedCount}`);
  } catch (error) {
    console.error("❌ Error corrigiendo usuarios:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Desconectado de MongoDB");
  }
}

fixBorrowedBooks();
