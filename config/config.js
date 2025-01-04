'use strict';

let parameter = null;
function addEnvParam(paramName, required = false) {
	// Evaluación del parámetro
	parameter = process.env[paramName];

	if (!parameter) {
		if (required)
			throw new Error('No se definió la variable de entorno ' + paramName);
		else return null;
	}

	return parameter;
}

/* Constantes de variables de entorno */

const config = {
	version: addEnvParam('VERSION', true),
	port: addEnvParam('PORT', true),
	env: addEnvParam('ENV', true),
	REGION: addEnvParam('REGION', true),

	// Postgres
	POSTGRES_USER: addEnvParam('POSTGRES_USER', true),
	POSTGRES_PASSWORD: addEnvParam('POSTGRES_PASSWORD', true),
	POSTGRES_HOST: addEnvParam('POSTGRES_HOST', true),
	POSTGRES_PORT: addEnvParam('POSTGRES_PORT', true),
	POSTGRES_DB: addEnvParam('POSTGRES_DB', true),
	POSTGRES_SCHEMA: addEnvParam('POSTGRES_SCHEMA', true)
};

module.exports = config;
