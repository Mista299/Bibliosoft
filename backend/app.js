require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');


const app = express();
const port = process.env.PORT ?? 3000;

require("dotenv").config();
// Conexión a MongoDB
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DBNAME = process.env.MONGO_DBNAME;
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@library0.t6p18uw.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority&appName=library0`;

console.log("🔑 TOKEN_KEY:", process.env.TOKEN_KEY);
console.log("📦 MONGO_URI:", MONGO_URI);


// Middlewares
app.use(express.json());
app.use(cookieParser());

connectDB(MONGO_URI);

// Configurar CORS para React (Vite o CRA suele correr en 5173 o 3000)
app.use(cors({
    origin: 'http://localhost:5173', // cambia según el puerto de tu frontend React
    credentials: true
}));

// 👉 Rutas API
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.listen(port, () => {
    console.log(`Servidor API escuchando en http://localhost:${port}`);
});
