require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
const port = process.env.PORT ?? 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Conexión a MongoDB
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DBNAME = process.env.MONGO_DBNAME;
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@library0.t6p18uw.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority&appName=library0`;

console.log("Mongo URI:", MONGO_URI);
connectDB(MONGO_URI);

// Configurar CORS para React (Vite o CRA suele correr en 5173 o 3000)
app.use(cors({
    origin: 'http://localhost:5173', // cambia según el puerto de tu frontend React
    credentials: true
}));

// 👉 Rutas API
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/protected', protectedRoutes);

app.listen(port, () => {
    console.log(`Servidor API escuchando en http://localhost:${port}`);
});
