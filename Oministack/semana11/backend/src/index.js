/*importa a função express*/
const express = require('express')

const cors = require('cors');

/*armazena a função express */
const routes = require('./routes');

/*armazena a função express*/
const app = express();

app.use(cors(/*{
  origin: 'http://meuapp.com'
}*/));

app.use(express.json());

/*usando a constante pelo app*/
app.use(routes);


app.listen(3333)

