const express = require('express');
const productRouter = require('./routers/products.router');
const salesRouter = require('./routers/sales.router');
// const connection = require('./models/db/connection');
// inicaindo projeto
const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/sales', salesRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;