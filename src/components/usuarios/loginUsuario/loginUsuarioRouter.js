'use strict';

const express = require('express');
const router = express.Router();

// Importar el controlador
const { loginUsuarioController } = require('./loginUsuarioController');

// Definir las rutas para el componente
router.post('/', loginUsuarioController);

module.exports = router;
