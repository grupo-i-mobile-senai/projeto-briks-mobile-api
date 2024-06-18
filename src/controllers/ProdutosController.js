import ConexaoMySql from "../database/ConexaoMySql.js";

class ProdutosController {
  //LISTAR
  async listarMeusProdutos(req, resp) {
    try {
      const idUsuarioLogado = req.headers["x-usuario-logado"];

      const filtro = req.query.filtro || "";
      const conexao = await new ConexaoMySql().getConexao();

      const sql =
        "SELECT * FROM produto WHERE usuario_id = ? AND titulo LIKE ?";
      const [resultado] = await conexao.execute(sql, [
        idUsuarioLogado,
        `%${filtro}%`,
      ]);

      resp.send(
        resultado.map((p) => {
          //   delete u.senha;
          return p;
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

      const sql = "SELECT * FROM produto WHERE titulo LIKE ?";
      const [resultado] = await conexao.execute(sql, [`%${filtro}%`]);

      resp.send(
        resultado.map((p) => {
          //   delete u.senha;
          return p;
        })
      );
    } catch (error) {
      resp.status(500).send(error);
    }
  }
  //////////////////////////////////////////////////////////
  async dadosProduto(req, resp) {
    try {
      // const filtro = req.query.filtro || "";
      const idProduto = +req.params.idProduto;
      const conexao = await new ConexaoMySql().getConexao();

      // const sql = "SELECT * FROM produto WHERE titulo LIKE ?";
      const sql =
        "SELECT usuario.nome FROM produto JOIN usuario ON produto.usuario_id = usuario.id_usuario WHERE produto.id_produto = ?";
      const [resultado] = await conexao.execute(sql, [idProduto]);

      resp.send(
        resultado.map((p) => {
          //   delete u.senha;
          return p;
        })
      );
    } catch (error) {
      resp.status(500).send(error);
    }
  }
  ///////////////////////////////////////////////////////////

  //ADICIONAR
  async adicionar(req, resp) {
    try {
      const novoProduto = req.body;
      const idUsuarioLogado = req.headers["x-usuario-logado"];

      if (
        !novoProduto.foto_produto ||
        !novoProduto.titulo ||
        !novoProduto.descricao ||
        !novoProduto.cep ||
        !novoProduto.rua ||
        !novoProduto.bairro ||
        !novoProduto.cidade
      ) {
        resp.status(400).send("Todos os campos são obrigatórios.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const sql =
        "INSERT INTO produto (foto_produto, titulo, descricao, cep, rua, bairro, cidade, dt_alteracao, usuario_id) VALUES (?,?,?,?,?,?,?, now(),?)";
      const [resultado] = await conexao.execute(sql, [
        novoProduto.foto_produto,
        novoProduto.titulo,
        novoProduto.descricao,
        novoProduto.cep,
        novoProduto.rua,
        novoProduto.bairro,
        novoProduto.cidade,
        // novoProduto.usuario_id
        idUsuarioLogado,
      ]);

      resp.send({ resultado });
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  //ATUALIZAR
  async atualizar(req, resp) {
    try {
      const produtoEditar = req.body;

      if (
        !produtoEditar.titulo ||
        !produtoEditar.descricao ||
        !produtoEditar.cep
      ) {
        resp
          .status(400)
          .send(
            "Os campos Título, Descrição e CEP são obrigatórios para atualizar."
          );
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const sql =
        "UPDATE produto SET foto_produto = ?, titulo = ?, descricao = ?, cep = ?, rua = ?, bairro = ?, cidade = ?, dt_alteracao = now() WHERE id_produto = ?";
      const [resultado] = await conexao.execute(sql, [
        produtoEditar.foto_produto,
        produtoEditar.titulo,
        produtoEditar.descricao,
        produtoEditar.cep,
        produtoEditar.rua,
        produtoEditar.bairro,
        produtoEditar.cidade,
        produtoEditar.id_produto,
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
      const sql = "DELETE FROM produto WHERE id_produto = ?";
      const [resultado] = await conexao.execute(sql, [+req.params.idProduto]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default ProdutosController;
