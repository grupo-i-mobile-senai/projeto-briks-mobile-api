import ConexaoMySql from "../database/ConexaoMySql.js";

class ServicosController {
  //LISTAR
  async listarMeusServicos(req, resp) {
    try {
      const idUsuarioLogado = req.headers["x-usuario-logado"]; 

      const filtro = req.query.filtro || "";
      const conexao = await new ConexaoMySql().getConexao();
      
      const sql = "SELECT * FROM servico WHERE usuario_id = ? AND titulo LIKE ?";
      const [resultado] = await conexao.execute(sql, [idUsuarioLogado, `%${filtro}%`]);

      resp.send(
        resultado.map((s) => {
          //   delete u.senha;
          return s;
        })
      );
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async listarTodos(req, resp) {
    try {
      const filtro = req.query.filtro || "";
      const conexao = await new ConexaoMySql().getConexao();
      
      const sql = "SELECT * FROM servico WHERE titulo LIKE ?";
      const [resultado] = await conexao.execute(sql, [`%${filtro}%`]);

      resp.send(
        resultado.map((s) => {
          //   delete u.senha;
          return s;
        })
      );
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async dadosServico(req, resp) {
    try {
      // const filtro = req.query.filtro || "";
      const idServico = +req.params.idServico
      const conexao = await new ConexaoMySql().getConexao();

      // const sql = "SELECT * FROM produto WHERE titulo LIKE ?";
      const sql = "SELECT usuario.nome FROM servico JOIN usuario ON servico.usuario_id = usuario.id_usuario WHERE servico.id_servico = ?";
      const [resultado] = await conexao.execute(sql, [idServico]);

      resp.send(
        resultado.map((s) => {
          //   delete u.senha;
          return s;
        })
      );
    } catch (error) {
      resp.status(500).send(error);
    }
  }


  //ADICIONAR
  async adicionar(req, resp) {
    try {
      const novoServico = req.body;
      const idUsuarioLogado = req.headers["x-usuario-logado"]; 

      if (
        !novoServico.titulo ||
        !novoServico.descricao ||
        !novoServico.regiao
        // !novoServico.bairro
      ) {
        resp
          .status(400)
          .send("Os campos Foto, Título, Descrição e Região são obrigatórios.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const sql =
        "INSERT INTO servico (foto_servico, titulo, descricao, regiao, bairro, dt_alteracao, usuario_id) VALUES (?,?,?,?,?,now(),?)";
      const [resultado] = await conexao.execute(sql, [
        novoServico.foto_servico,
        novoServico.titulo,
        novoServico.descricao,
        novoServico.regiao,
        novoServico.bairro,
        idUsuarioLogado
      ]);

      resp.send({ resultado });
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  //ATUALIZAR
  async atualizar(req, resp) {
    try {
      const servicoEditar = req.body;

      if (!servicoEditar.titulo || !servicoEditar.descricao) {
        resp
          .status(400)
          .send(
            "Os campos titulo e descricao são obrigatórios para atualizar."
          );
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const sql =
        "UPDATE servico SET foto_servico = ?, titulo = ?, descricao = ?, regiao = ?, bairro = ?, dt_alteracao = now() WHERE id_servico = ?";
      const [resultado] = await conexao.execute(sql, [
        servicoEditar.foto_servico,
        servicoEditar.titulo,
        servicoEditar.descricao,
        servicoEditar.regiao,
        servicoEditar.bairro,
        servicoEditar.id_servico,
      ]);

      resp.send({ resultado });
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  //EXCLUIR
  async excluir(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const sql = "DELETE FROM servico WHERE id_servico = ?";
      const [resultado] = await conexao.execute(sql, [+req.params.idServico]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default ServicosController;
