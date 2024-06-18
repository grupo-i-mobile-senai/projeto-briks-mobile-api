import ConexaoMySql from "../database/ConexaoMySql.js";

class PerfilController {
  //LISTAR
  async listar(req, resp) {
    try {
      const filtro = req.query.filtro || "";
      const conexao = await new ConexaoMySql().getConexao();
      // const sql = 'SELECT * FROM servico WHERE titulo LIKE ?';
      const sql = "SELECT * FROM usuario";
      const [resultado] = await conexao.execute(sql, [`%${filtro}%`]);

      resp.send(
        resultado.map((u) => {
          // delete u.senha;
          return u;
        })
      );
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  //ATUALIZAR
  async atualizar(req, resp) {
    try {
      const usuarioEditar = req.body;

      if (!usuarioEditar.nome || !usuarioEditar.email) {
        resp
          .status(400)
          .send("Os campos nome e email são obrigatórios para atualizar.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const sql = "UPDATE usuario SET foto_perfil = ?, nome = ?, email = ? WHERE id_usuario = ?";
      const [resultado] = await conexao.execute(sql, [
        usuarioEditar.foto_perfil,
        usuarioEditar.nome,
        usuarioEditar.email,
        usuarioEditar.id_usuario,
      ]);

      resp.send({ resultado });
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default PerfilController;
