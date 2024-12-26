'use strict';

const express = require('express');

function routerApi(app) {
	const router = express.Router();

	// Rutas de la API

	//router.use('/v1/comunas/listado', listadoComunasRouter);

	// la ruta base de la api
	app.use('/apiTienda', router);
}

module.exports = routerApi;
