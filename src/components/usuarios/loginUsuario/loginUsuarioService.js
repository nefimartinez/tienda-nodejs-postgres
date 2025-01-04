'use strict';

const logger = require('../../../utils/LoggerCNS').loggerCNS;
const { executeQuery } = require('../../../utils/handlePostgresDB');

module.exports.isUsuario = async (nombre, correo) => {
	logger.info('=====================================');
	logger.info('  Iniciando isUsuario                ');
	logger.info('=====================================');

	try {
		// Validar que el usuario exista
		const query = `SELECT * FROM "TiendaDB"."usuarios" WHERE nombre = $1 and correo = $2;`;
		const values = [nombre, correo];

		const response = await executeQuery(query, values);
		logger.info('Usuario encontrado: ', response);
		return response;
	} catch (error) {
		logger.error('Error en isUsuario Service');
		throw error;
	}
};
