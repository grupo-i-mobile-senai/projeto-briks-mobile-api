import cors from "cors";
import express from "express";
import AutenticacaoController from "./controllers/AutenticacaoController.js";
import UsuariosController from "./controllers/UsuariosController.js";
import ProdutosController from "./controllers/ProdutosController.js";
import ServicosController from "./controllers/ServicosController.js";
import PerfilController from "./controllers/PerfilController.js";
import DashboardController from "./controllers/DashboardController.js";

const port = 3000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// AUTENTICACAO
const autenticacaoController = new AutenticacaoController();
app.post("/logar", autenticacaoController.logar);

// CRUD Usuarios
const usuariosController = new UsuariosController();
app.get("/usuarios", usuariosController.listar);
app.post("/usuarios", usuariosController.adicionar);
app.put("/usuarios/:idUsuario", usuariosController.atualizar);
app.delete("/usuarios/:idUsuario", usuariosController.excluir);


// CRUD Perfil
const perfilController = new PerfilController()
app.get("/perfil", perfilController.listar);
app.put("/perfil", perfilController.atualizar);

// CRUD Produtos
const produtosController = new ProdutosController()
app.get("/meus-produtos", produtosController.listarMeusProdutos);
app.get("/produtos", produtosController.listarTodos);
app.get("/produtos/:idProduto", produtosController.dadosProduto);
app.post("/produtos", produtosController.adicionar);
app.put("/produtos", produtosController.atualizar);
app.delete("/produtos/:idProduto", produtosController.excluir);



// CRUD Servicos
const servicosController = new ServicosController()
app.get("/meus-servicos", servicosController.listarMeusServicos);
app.get("/servicos", servicosController.listarTodos);
app.get("/servicos/:idServico", servicosController.dadosServico);
app.post("/servicos", servicosController.adicionar);
app.put("/servicos/", servicosController.atualizar);
app.delete("/servicos/:idServico", servicosController.excluir);

const dashBoardController = new DashboardController()
app.get("/dashboard", dashBoardController.listar);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
