const mongoURI = 'mongodb+srv://Fabiana1504:123@cluster0.a08e3ro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const routes = require('./rutas/rutasUsuario');    // Importa las rutas de usuario
const camisetaRoutes = require('./rutas/rutasCamiseta'); // Importa las rutas de camiseta
const express = require('express');

const { verificarToken } = require('./seguridad/auth');// Importa la función de verificación de token
const mongoose = require('mongoose'); // importamos la librería Mongoose 
const path = require('path'); // Módulo para rutas absolutas
const PORT = process.env.PORT || 3000;


// URI de conexión a MongoDB (MongoDB Atlas en este caso).  
// Reemplaza <usuario>, <password> y <tuBase> por tus datos reales. 

// Opciones recomendadas para evitar advertencias (según la versión de Mongoose) 
const options = { 
useNewUrlParser: true,    // Usa el nuevo parser de URL Mongo 
useUnifiedTopology: true  // Usa el nuevo motor de manejo de topologías 
}; 
// Conectarse a la base de datos: 
mongoose.connect(mongoURI, options) 
.then(() => console.log('Conectado a MongoDB Atlas'))   // Éxito en la conexión 
.catch(err => console.error('Error de conexión:', err)); // Manejo de error 


const app = express();

// Middleware para parsear JSON en las peticiones (body-parser integrado)
app.use(express.json());   // Permite recibir datos en formato JSON
//app.use(express.static(path.join(__dirname, 'public')));
  // Todo lo de la carpeta public se sirve de forma estática y accesible desde fuera (navegador)
  // Middleware para parsear JSON en las peticiones (body-parser integrado)

//app.use(express.static(path.join(__dirname, 'public')));

app.get('/camiseta', verificarToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'camiseta.html'));
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.use('/api/camisetas', camisetaRoutes);
app.use('/api/usuarios', routes); // Usa las rutas de usuario definidas en usuarioRutas.js
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});
// Probar en http://localhost:3000/registro.html