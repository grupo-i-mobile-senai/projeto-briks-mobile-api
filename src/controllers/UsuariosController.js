import ConexaoMySql from "../database/ConexaoMySql.js";

class UsuariosController {
  //LISTAR
  async listar(req, resp) {
    try {
      const idUsuarioLogado = req.headers["x-usuario-logado"]; // pega o usuário logado do header
      console.log({ idUsuarioLogado });

      const filtro = req.query.filtro || "";
      const conexao = await new ConexaoMySql().getConexao();
      // const sql = 'SELECT * FROM usuario WHERE nome LIKE ?';
      const sql = "SELECT * FROM usuario";
      const [resultado] = await conexao.execute(sql, [`%${filtro}%`]);

      resp.send(
        resultado.map((u) => {
          delete u.senha;
          return u;
        })
      );
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  //ADICIONAR
  async adicionar(req, resp) {
    try {
      const novoUsuario = req.body;

      if (
        !novoUsuario.nome ||
        !novoUsuario.cpf ||
        !novoUsuario.email ||
        !novoUsuario.senha
      ) {
        resp.status(400).send("Todos os campos são obrigatórios.");
        return;
      }
      if (novoUsuario.cpf.length !== 11) {
        resp.status(400).send("CPF deve conter 11 dígitos.");
        return;
      }
      if (
        !novoUsuario.email.includes("@") ||
        !novoUsuario.email.includes(".com")
      ) {
        resp
          .status(400)
          .send("Email inválido. Por favor, inclua '@' e '.com'.");
        return;
      }
      if (novoUsuario.senha.length < 6) {
        resp.status(400).send("A senha deve conter no mínimo 6 caracteres.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();

      // VERIRIFANDO SE USUARIO EXISTE PELO CPF OU EMAIL
      let sql = "SELECT * FROM usuario WHERE cpf = ? OR email = ?";
      let [resultado] = await conexao.execute(sql, [
        novoUsuario.cpf,
        novoUsuario.email,
      ]);

      if (resultado.length > 0) {
        resp.status(400).send("CPF ou Email já cadastrado.");
        return;
      }

      // const conexao = await new ConexaoMySql().getConexao();
      sql =
        "INSERT INTO usuario (nome, cpf, email, senha) VALUES (?,?,?,md5(?))";
      [resultado] = await conexao.execute(sql, [
        // novoUsuario.foto_perfil,
        novoUsuario.nome,
        novoUsuario.cpf,
        novoUsuario.email,
        novoUsuario.senha,
      ]);

      resp.send({ resultado });
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
      const sql =
        "UPDATE usuario SET foto_perfil = ?, nome = ?, email = ? WHERE id_usuario = ?";
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

  //EXCLUIR
  async excluir(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const sql = "DELETE FROM usuario WHERE id_usuario = ?";
      const [resultado] = await conexao.execute(sql, [+req.params.idUsuario]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default UsuariosController;
