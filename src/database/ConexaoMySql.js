import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.MYSQLHOST || "localhost",
  port: process.env.MYSQLPORT || "3306",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "senai",
  database: process.env.MYSQLDATABASE || "banco_dados_briks",
};

class ConexaoMySql {
  static conexao = null;

  async getConexao() {
    if (!ConexaoMySql.conexao) {
      ConexaoMySql.conexao = await mysql.createConnection(dbConfig);
    }
    return ConexaoMySql.conexao;
  }
}

export default ConexaoMySql;
