import ConexaoMySql from "../database/ConexaoMySql.js";

class AutenticacaoController {
  async logar(req, resp) {
    try {
      if (!req.body.email || !req.body.cpf || !req.body.senha) {
        resp
          .status(400)
          .send("Os campos email ou CPF e senha são obrigatórios!");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const sql =
        "SELECT * FROM usuario WHERE (cpf = ? OR email = ?)  AND senha = md5(?)";
      const [resultado] = await conexao.execute(sql, [
        req.body.cpf,
        req.body.email,
        req.body.senha,
      ]);

      const usuarioEncontradoNoBancoDeDados = resultado[0];

      if (!usuarioEncontradoNoBancoDeDados) {
        resp.status(401).send("Email, CPF ou senha incorreta!");
        return;
      }

      delete usuarioEncontradoNoBancoDeDados.senha;
      resp.send(usuarioEncontradoNoBancoDeDados);
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default AutenticacaoController;
