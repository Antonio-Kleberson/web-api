const alunos = require("../data/alunos");
const Aluno = require("../models/alunoModel");

class AlunoService {
  static listar() {
    return [...alunos];
  }

  static buscarPorId(id) {
    return alunos.find(a => a.id === id) || null;
  }

  static cadastrar({ nome, curso, ira }) {
    if (!nome || !curso || isNaN(parseFloat(ira))) {
      throw new Error("Dados inválidos para cadastro");
    }
    const novoId = alunos.length ? Math.max(...alunos.map(a => a.id)) + 1 : 1;
    const novoAluno = new Aluno(novoId, nome, curso, parseFloat(ira));
    alunos.push(novoAluno);
    return novoAluno;
  }

  static atualizar(id, { nome, curso, ira }) {
    const aluno = alunos.find(a => a.id === id);
    if (!aluno) return null;

    aluno.nome = nome;
    aluno.curso = curso;
    aluno.ira = parseFloat(ira);
    return aluno;
  }

  static remover(id) {
    const index = alunos.findIndex(a => a.id === id);
    if (index === -1) return null;
    return alunos.splice(index, 1)[0];
  }
}

module.exports = AlunoService;
