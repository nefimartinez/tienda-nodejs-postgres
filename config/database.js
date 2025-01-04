'use strict';

// importa config
const config = require('../config/config');

const configPostgresDB = {
	host: config.POSTGRES_HOST,
	user: config.POSTGRES_USER,
	password: config.POSTGRES_PASSWORD,
	database: config.POSTGRES_DB,
	schemaDB: config.POSTGRES_SCHEMA,
	port: config.POSTGRES_PORT,
	max: 10, // Número máximo de conexiones en el pool
	idleTimeoutMillis: 30000, // Tiempo maximo de inactiviad antes de cerrar la conexión (milisegundos)
	connectionTimeoutMillis: 2000, // Tiempo maximo de espera para establecer una conexión (milisegundos)
};

module.exports = { configPostgresDB };
