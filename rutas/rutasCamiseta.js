const express = require('express');
const router = express.Router();
const camisetaController = require('../controladores/camisetaControlador');
const { verificarToken } = require('../seguridad/auth');


router.get('/', verificarToken, camisetaController.getCamisetas);
router.get('/:id', verificarToken, camisetaController.getCamisetaById);
router.post('/', verificarToken, camisetaController.createCamiseta);
router.put('/:id', verificarToken,  camisetaController.updateCamiseta);
router.delete('/:id', verificarToken, camisetaController.deleteCamiseta);
router.put('/vota/:id', verificarToken,  camisetaController.votarCamiseta);

module.exports = router;