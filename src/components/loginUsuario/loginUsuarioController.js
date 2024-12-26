'use strict';

const { loginUsuarioModule } = require('../loginUsuario/loginUsuarioModule');
const { SUCCESS, INTERNAL_ERROR } = require('../../utils/constantes');
const logger = require('../../utils/LoggerCNS').loggerCNS;

module.exports.loginUsuarioController = async (req, res) => {
	logger.info('=====================================');
	logger.info('  Iniciando loginUsuarioController ');
	logger.info('=====================================');
	try {
		const response = await loginUsuarioModule();
		if (response.err_code === -1) {
			res.status(SUCCESS).json({
				err_code: -1,
				status: SUCCESS,
				response
			});
		} else {
			res.status(SUCCESS).json({
				err_code: 0,
				status: SUCCESS,
				response
			});
		}
	} catch (error) {
		res.status(error.statusCode || INTERNAL_ERROR).json({
			err_code: 1,
			status: error.statusCode || INTERNAL_ERROR,
			err_msg: error.message || 'Error interno'
		});
	}
};
