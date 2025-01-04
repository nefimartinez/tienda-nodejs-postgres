'use strict';

const express = require('express');

// Importar los routers de cada componente
const loginUsuarioRouter = require('../src/components/usuarios/loginUsuario/loginUsuarioRouter');

function routerApi(app) {
	const router = express.Router();

	//rutas de los componentes
	router.use('/v1/loginUsuario', loginUsuarioRouter);

	// la ruta base de la api
	app.use('/apiTienda', router);
}

module.exports = routerApi;
