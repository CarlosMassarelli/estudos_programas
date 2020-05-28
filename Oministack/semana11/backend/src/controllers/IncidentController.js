
const connection = require('../database/connection');

module.exports = {
  //método list
  async index(request,response) {
    // criando paginação
    const{ page = 1} = request.query;
    
    const [count] = await connection('incidents').count()

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) *5)
      .select([
        'incidents.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf']);
    
    response.header('x-Total-Count', count['count(*)'])
      
    return response.json(incidents);
  },

  //método create
  async create(request, response) {
    const { title, description, value } = request.body;
    //request.readers; (recebe os dados do cabeçalho da requisição)
    const ong_id = request.headers.authorization;
    
    //cria const result = para pegar tudo
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });
    // const id = result[0]; (captura o primeiro elemento da matriz)
    // manda com {} para saber que é o id
    return response.json({ id })
  },

    //método delete
    async delete(request,response) {
      const {id} = request.params;
      const ong_id = request.headers.authorization;
      
      const incidents = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first(); 
        //retorna apenas o primeiro resultado

        if(incidents.ong_id != ong_id) {
        return response.status(401).json({
          error: 'Operação não permitida!'
        });
      }
      await connection('incidents').where('id', id).delete();
      return response.status(204).send();
    },
};
