const express = require('express');
const matchs = require('./routes/matchs');
const users = require('./routes/users');

const app = express();

app.use(express.json());

app.use('/users', users);
app.use('/matchs', matchs);

const PORT = 3303;
app.listen(PORT, () => { console.log(`Funcionando na porta ${PORT}`) });