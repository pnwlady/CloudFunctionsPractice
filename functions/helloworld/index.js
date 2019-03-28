const excapeHtml = require('excape-html');

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */

 exports.helloHttp = (req, res) => {
     res.send(`Hello ${excapeHtml(req.query.name || req.body.name || 'World')}!`);
 }