'use strict';

const { loginUsuarioModule } = require('./loginUsuarioModule');
const {
	SUCCESS,
	INTERNAL_ERROR,
	NOT_FOUND
} = require('../../../utils/constantes');
const logger = require('../../../utils/LoggerCNS').loggerCNS;

module.exports.loginUsuarioController = async (req, res) => {
	logger.info('=====================================');
	logger.info('  Iniciando loginUsuarioController   ');
	logger.info('=====================================');
	try {
		const response = await loginUsuarioModule(req.body);
		if (response.err_code === -1) {
			// NO-OK

			res.status(response.statuscode || NOT_FOUND).json({
				err_code: -1,
				status: response.statuscode,
				err_msg: response.err_msg
			});
		} else {
			// OK
			res.status(response.statuscode || SUCCESS).json({
				err_code: 0,
				status: SUCCESS,
				response
			});
		}
	} catch (error) {
		res.status(error.statusCode || INTERNAL_ERROR).json({
			// Error
			err_code: 1,
			status: error.statusCode || INTERNAL_ERROR,
			err_msg: error.message || 'Error interno'
		});
	}
};
