import ConexaoMySql from "../database/ConexaoMySql.js";

class DashboardController {
  //LISTAR
  // async listarMeusProdutos(req, resp) {
  //   try {
  //     const idUsuarioLogado = req.headers["x-usuario-logado"];

  //     const filtro = req.query.filtro || "";
  //     const conexao = await new ConexaoMySql().getConexao();

  //     const sql = "SELECT * FROM produto WHERE usuario_id = ? AND titulo LIKE ?";
  //     const [resultado] = await conexao.execute(sql, [idUsuarioLogado, `%${filtro}%`]);

  //     resp.send(
  //       resultado.map((p) => {
  //         //   delete u.senha;
  //         return p;
  //       })
  //     );
  //   } catch (error) {
  //     resp.status(500).send(error);
  //   }
  // }

  async listar(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();

      const sqlProduto = "SELECT COUNT(*) as totalProdutos FROM produto";
      const [resultadoProduto] = await conexao.execute(sqlProduto);

      const sqlServico = "SELECT COUNT(*) as totalServicos FROM servico";
      const [resultadoServico] = await conexao.execute(sqlServico);

      const sqlUsuario = "SELECT COUNT(*) as totalUsuarios FROM usuario";
      const [resultadoUsuario] = await conexao.execute(sqlUsuario);

      resp.send({
        totalProdutos: resultadoProduto[0]["totalProdutos"],
        totalServicos: resultadoServico[0]["totalServicos"],
        totalUsuarios: resultadoUsuario[0]["totalUsuarios"],
      });
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  // async listarServicos(req, resp) {
  //   try {
  //     const filtro = req.query.filtro || "";
  //     const conexao = await new ConexaoMySql().getConexao();

  //     const sql = "SELECT * FROM servico WHERE titulo LIKE ?";
  //     const [resultado] = await conexao.execute(sql, [`%${filtro}%`]);

  //     resp.send(
  //       resultado.map((s) => {
  //         //   delete u.senha;
  //         return s;
  //       })
  //     );
  //   } catch (error) {
  //     resp.status(500).send(error);
  //   }
  // }
}

export default DashboardController;
