/*importa a função express*/
const express = require('express'); 

/*importa biblioteca para gerar string aleatória*/
/*enviada para controlers*/
/*const crypto = require('crypto'); */

const OngController = require('./controllers/OngController')
/*importa dados conexão BD do arquivo connection*/
/*const connection = require('./database/connection');*/
/* agora não é mais utilizada (esta no controller)*/

const IncidentController = require('./controllers/IncidentController')

/*cria rota para ProfileController */
const ProfileController = require('./controllers/ProfileController')

/*cria rota para SessionController */
const SessionController = require('./controllers/SessionController')

/*desacopla rotas do express*/
const routes = express.Router(); 

/* cria sessão de LOGIN*/
routes.post('/sessions', SessionController.create);

/* rota de listagem (comentada para uso posterior*/
routes.get('/ongs', OngController.index);

/* rota de inclusão */
routes.post('/ongs', OngController.create);
/*dados inseridos no controller.js */

/*rota para listar casos da ong */
routes.get('/profile', ProfileController.index);

/* rota de incidents */
routes.get('/incidents', IncidentController.index);

routes.delete('/incidents/:id', IncidentController.delete);

routes.post('/incidents', IncidentController.create);
/*dados inseridos no controller.js */

module.exports = routes;

