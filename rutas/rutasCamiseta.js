const express = require('express');
const router = express.Router();
const camisetaController = require('../controladores/camisetaControlador');


router.get('/', camisetaController.getCamisetas);
router.get('/:id', camisetaController.getCamisetaById);
router.post('/',camisetaController.createCamiseta);
router.put('/:id', camisetaController.updateCamiseta);
router.delete('/:id', camisetaController.deleteCamiseta);

module.exports = router;