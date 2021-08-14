/**
 * @typedef {Object} RequestWithSession
 * @property {number} userId - The User ID, default to 0 if the user is not authenticated.
 * @property {string} sessionId
 * @property {Object.<string, any>} query
 * @property {Object.<string, any>} params
 */

/**
 * @typedef {Object} CustomResponse
 * @property {function(string, string|number, boolean):WebApiResponse} setHeader
 */

/**
 * @typedef {import('express').Request & RequestWithSession & Object.<string, any>} WebApiRequest
 * @typedef {import('express').Response & CustomResponse & Object.<string, any>} WebApiResponse
 */

module.exports = null;
