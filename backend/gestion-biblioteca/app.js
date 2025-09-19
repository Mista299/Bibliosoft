require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/database');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
const port = process.env.PORT ?? 3000;
app.use(express.json());
app.use(cookieParser());

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DBNAME = process.env.MONGO_DBNAME;
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@library0.t6p18uw.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority&appName=library0`;

console.log("Mongo URI:", MONGO_URI);

connectDB(MONGO_URI);

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
}));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// 👉 Ruta inicial
app.get('/', (req, res) => {
    res.render('login');
});

// Rutas API
app.use('/api', userRoutes);
app.use('/api', bookRoutes);

// Rutas protegidas
app.use(protectedRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
