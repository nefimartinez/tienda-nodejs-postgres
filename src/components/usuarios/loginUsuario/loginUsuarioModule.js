'use strict';

const logger = require('../../../utils/LoggerCNS').loggerCNS;
const { isUsuario } = require('./loginUsuarioService');
const bcrypt = require('bcrypt');
const ModuleError = require('../../../utils/moduleError');
const {
	INTERNAL_ERROR,
	NOT_FOUND,
	BAD_REQUEST,
	SUCCESS,
	UNAUTHORIZED
} = require('../../../utils/constantes');

module.exports.loginUsuarioModule = async (body) => {
	logger.info('=====================================');
	logger.info('  Iniciando loginUsuarioModule       ');
	logger.info('=====================================');
	try {
		const { nombre, contraseña, correo, rol } = body;

		// Validar datos de entrada
		if (!nombre || !contraseña || !correo || !rol) {
			logger.error('Faltan datos obligatorios');
			return {
				err_code: -1,
				statuscode: BAD_REQUEST,
				err_msg: 'Faltan datos obligatorios'
			};
		}

		// Validar que exista el usuario y correo
		const validaUsuario = await isUsuario(nombre, correo);
		if (validaUsuario.length === 0) {
			logger.error('Usuario no encontrado');
			return {
				err_code: -1,
				statuscode: NOT_FOUND,
				err_msg: 'Usuario no encontrado'
			};
		}

		const user = validaUsuario[0];

		// Validar contraseña
		const validPassword = await bcrypt.compare(contraseña, user.contraseña);
		if (!validPassword) {
			logger.error('Contraseña incorrecta');
			return {
				err_code: -1,
				statuscode: UNAUTHORIZED,
				err_msg: 'Contraseña incorrecta'
			};
		}

		// Usuario logueado correctamente
		logger.info('Usuario logueado correctamente');
		return {
			msg: 'Usuario logueado correctamente',
			user: {
				nombre: user.nombre,
				correo: user.correo,
				rol: user.rol
			}
		};
	} catch (error) {
		if (error.statusCode) throw error; // error controlado
		const moduleError = new ModuleError(error.message);
		moduleError.statusCode = INTERNAL_ERROR;
		logger.error(' Error en loginUsuarioModule ');
		logger.error(' Error module: ', error);
		throw moduleError;
	}
};
