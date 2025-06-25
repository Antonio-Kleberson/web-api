const express = require('express');
const cors = require('cors');
const path = require('path');

const alunosRouter = require('./routes/alunoRoute');

const app = express();

app.use(cors());
app.use(express.json());

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal dos alunos
app.use('/alunos', alunosRouter);

module.exports = app;
