'use strict';

const express = require('express');

const loginUsuarioRouter = require('../src/components/loginUsuario/loginUsuarioController');

function routerApi(app) {
	const router = express.Router();

	
	// Login usuario
	router.use('/v1/loginUsuario', loginUsuarioRouter);

	// la ruta base de la api
	app.use('/apiTienda', router);
}

module.exports = routerApi;
