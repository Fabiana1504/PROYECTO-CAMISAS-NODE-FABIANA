const express = require('express');
const router = express.Router();
const usuarioController = require('../controladores/usuarioControlador');

router.get('', usuarioController.obtenerUsuarios);
router.get('/:id', usuarioController.obtenerUsuarioPorId);
router.post('/', usuarioController.crearUsuario);
router.put('/:id', usuarioController.modificarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);
router.post('/login', usuarioController.login);

module.exports = router;