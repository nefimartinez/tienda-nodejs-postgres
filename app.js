'use strict';

const express = require('express');
require('express-async-errors');
const helmet = require('helmet');
const router = require('./routes');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');
const loggerCNS = require('./src/utils/LoggerCNS').loggerCNS;
const { pool } = require('./src/utils/handlePostgresDB');

const app = express();

async function serverStart() {
	try {
		app.use(bodyParser.json());
		app.use(helmet());

		// cors config
		const corsConfig = {
			origin: ['https://*']
		};
		app.use(cors(corsConfig));

		// Incorporar rutas
		router(app);

		//conecta a DB
		await connectDB();
		loggerCNS.info('Conectado a la DB');
	} catch (error) {
		loggerCNS.error(error);
		await cleanup();
	}
}

async function connectDB() {
	try {
		// Create coneccion a db
		//consulta de prueba para verificar la coneccion
		await pool.query('SELECT NOW()');
		loggerCNS.info('Coneccion a la DB establecida');
	} catch (error) {
		loggerCNS.error('Error al conectar a la DB');
		loggerCNS.error('Error : ', error);
		throw error;
	}
}

async function disconnectDB() {
	try {
		// Cerrar coneccion a db
		await pool.end(); // cierra todas las conexiones
		loggerCNS.info('Coneccion a la DB cerrada');
	} catch (error) {
		loggerCNS.error('Error al cerrar la DB');
		loggerCNS.error('Error : ', error);
		throw error;
	}
}

async function cleanup() {
	try {
		loggerCNS.info('Desconectando...');
		await disconnectDB();
		process.exit(0);
	} catch (error) {
		loggerCNS.error(error);
		process.exit(1);
	}
}

// Captura de señales de S.O. en las que ejecutaremos el cierre de conexiones
process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);
process.on('SIGHUP', cleanup);

serverStart();

module.exports = app;
