-- criando banco de dados
CREATE DATABASE banco_dados_briks;

USE banco_dados_briks;
-- critando tabelas

-- tabela USUARIO
CREATE TABLE usuario 
(
    id_usuario INT NOT NULL AUTO_INCREMENT,
    foto_perfil LONGTEXT,
    nome VARCHAR(45) NOT NULL,
    cpf BIGINT UNIQUE NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL,
    senha VARCHAR(45) NOT NULL,
    PRIMARY KEY (id_usuario)
);

-- tabela PRODUTO
CREATE TABLE produto
(
    id_produto INT NOT NULL AUTO_INCREMENT,
    foto_produto LONGTEXT NOT NULL,
    titulo VARCHAR(45) NOT NULL,
    descricao TEXT NOT NULL,
    cep INT NOT NULL,
    rua VARCHAR(45) NOT NULL,
    bairro VARCHAR(45) NOT NULL,
    cidade VARCHAR(45) NOT NULL,
    categoria VARCHAR(45) DEFAULT 'Produto',
    dt_alteracao DATETIME,
    
     -- add coluna chave estrangeira
    usuario_id INT,
    
    -- chave primaria
      PRIMARY KEY (id_produto),

    -- add chave estrangeira
    FOREIGN KEY (usuario_id)
    REFERENCES usuario (id_usuario)
);

-- tabela SERVICO
CREATE TABLE servico
(
    id_servico INT NOT NULL AUTO_INCREMENT,
    foto_servico LONGTEXT NOT NULL,
    titulo VARCHAR(45) NOT NULL,
    descricao TEXT NOT NULL,
    regiao VARCHAR(45) NOT NULL,
    bairro TEXT,
    categoria VARCHAR(45) DEFAULT 'Serviço',
    dt_alteracao DATETIME,
    
    -- add coluna chave estrangeira
    usuario_id INT,
    
    -- chave primaria
    PRIMARY KEY (id_servico),
    
    -- add chave estrangeira
    FOREIGN KEY (usuario_id)
    REFERENCES usuario (id_usuario)
);

SELECT * FROM usuario;

SELECT * FROM produto;

SELECT * FROM servico;