const Camiseta = require('../modelos/camisetaEsquema');
const bcrypt = require('bcryptjs');
const Usuario = require('../modelos/usuarioEsquema'); // Importar el modelo de usuario
const jwt = require('jsonwebtoken');


exports.getCamisetas = async (req, res) => {
  try {
    // Supongamos que ya tenemos una lista de camisetas obtenida de la base de datos:
const camisetas = await Camiseta.find();  // Lista de camisetas desde la coleccion (ejemplo)

// Enriquecer cada camiseta con datos del usuario creador:
const camisetasConUsuario = await Promise.all(
  camisetas.map(async (c) => {
    try {
      // Buscar al usuario por ID (c.creador) y seleccionar solo nombre y correo
      const usuario = await Usuario.findById(c.creador).select('nombre correo');
      return {
        ...c.toObject(),        // Convertir el documento de Mongoose a objeto plano JS
        creador: usuario || null // Reemplazar el campo 'creador' con los datos del usuario (o null si no se encontró)
      };
    } catch (error) {
      // En caso de error al buscar usuario, devolvemos la camiseta con 'creador' null
      return {
        ...c.toObject(),
        creador: null
      };
    }
  })
);
    res.json(camisetasConUsuario); // Enviar la lista enriquecida como respuesta
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.getCamisetaById = async (req, res) => {
  try {
    console.log("si llega");
    console.log(req.params.id);
    const camiseta = await Camiseta.findById(req.params.id);
    if (!camiseta) return res.status(404).json({ error: 'Camiseta no encontrado' });
    res.json(camiseta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' }); 
  }
};

exports.createCamiseta = async (req, res) => {
  try {
   
        // 1. Generar un salt (semilla aleatoria) para el hash

  const nuevoCamiseta = new Camiseta(req.body);
  nuevoCamiseta.creador = req.usuarioId; // Asignar el ID del usuario autenticado como creador
   CamisetaGuardada= await nuevoCamiseta.save();
    

    res.status(201).json({mensaje: 'Camiseta creada', camiseta: CamisetaGuardada});
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear camiseta' });
  }
};

exports.updateCamiseta = async (req, res) => {
  try {
    const CamisetaActualizada = await Camiseta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!CamisetaActualizada) return res.status(404).json({ error: 'Camiseta no encontrado' });
    res.json(CamisetaActualizada);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar usuario' });
  }
};

exports.deleteCamiseta = async (req, res) => {
  try {
    const CamisetaEliminada = await Camiseta.findByIdAndDelete(req.params.id);
    if (!CamisetaEliminada) return res.status(404).json({ error: 'Camiseta no encontrado' });
    res.json({ message: 'Camiseta eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};