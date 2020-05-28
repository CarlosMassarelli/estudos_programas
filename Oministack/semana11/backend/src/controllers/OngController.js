const crypto = require('crypto');

const connection = require('../database/connection');

module.exports = {
  async index(request,response) {
    const ongs = await connection('ongs').select('*');
  
    return response.json(ongs);
  },

  async create(request, response) {
    const {name, email, whatsapp, city, uf} = request.body;
  
    /*solicita um id (randomico) de 4 bites e transforma em string hexadecimal*/
    const id = crypto.randomBytes(4).toString('HEX');
   
    /*usa a conexão (connection) com o BD para 
    inserir as informações entregues pelo 
    usuário no corpo (body*/
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    return response.json ({ id });
  }
};