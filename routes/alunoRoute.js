const express = require("express");
const router = express.Router();
const AlunoService = require("../services/aluno.service");

// Listar
router.get("/listar", (req, res) => {
  try {
    const lista = AlunoService.listar();
    res.status(200).json(lista);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Buscar por ID
router.get("/recuperar/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = AlunoService.buscarPorId(id);

  if (!aluno) {
    return res.status(404).json({ mensagem: "Aluno não encontrado" });
  }

  res.json(aluno);
});

// Cadastrar
router.post("/cadastrar", (req, res) => {
  try {
    const { nome, curso, ira } = req.body;

    if (!nome || !curso || ira == null) {
      return res.status(400).json({ erro: "Dados inválidos para cadastro" });
    }

    const novoAluno = AlunoService.cadastrar({ nome, curso, ira });
    res.status(201).json({ mensagem: "Aluno cadastrado com sucesso", aluno: novoAluno });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Atualizar
router.put("/atualizar/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, curso, ira } = req.body;

    if (!nome || !curso || ira == null) {
      return res.status(400).json({ erro: "Dados inválidos para atualização" });
    }

    const alunoAtualizado = AlunoService.atualizar(id, { nome, curso, ira });

    if (!alunoAtualizado) {
      return res.status(404).json({ erro: "Aluno não encontrado" });
    }

    res.json({ mensagem: "Aluno atualizado com sucesso", aluno: alunoAtualizado });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Remover
router.delete("/apagar/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const removido = AlunoService.remover(id);

  if (!removido) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }

  res.json({ mensagem: "Aluno removido com sucesso", aluno: removido });
});

module.exports = router;
