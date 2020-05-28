/*importa biblioteca knex*/
const knex = require('knex');

/*importa configuração knex*/
const configuration = require('../../knexfile');

/*importa dados para connections / migrations*/
const connection = knex(configuration.development);

/*exporta informações para routes*/
module.exports = connection