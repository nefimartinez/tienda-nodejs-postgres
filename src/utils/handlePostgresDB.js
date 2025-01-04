const { configPostgresDB } = require('../../config/database.js');

const pg = require('pg');
const pool = new pg.Pool(configPostgresDB);

const logger = require('../utils/LoggerCNS').loggerCNS;

// manejo de errores en el pool
pool.on('error', (err) => {
	logger.error(' Error inesperado en el cliente de base de datos ');
	logger.error(err.message, err.stack);
	process.exit(-1); //Cierra la aplicacion en caso de error critico
});

async function executeQuery(query, params = []) {
	logger.info(' Iniciando executeQuery() ');
	const client = await pool.connect();
	try {
		const response = await client.query(query, params);
		return response.rows;
	} catch (error) {
		logger.error(' Error en executeQuery() ');
		logger.error(' Error : ', error.message);
		throw error; 
	} finally {
		client.release(); // Asegura que se libere el cliente
	}
}

module.exports = { executeQuery , pool };
