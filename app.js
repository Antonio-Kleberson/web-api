// app.js
const express = require("express");
const cors = require("cors");
const alunosRouter = require('./routes/alunoRoute');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/alunos", alunosRouter);

module.exports = app; // ⚠️ Importante para o bin/www funcionar
