## Como usar

Primeiramente, certifique-se que seu banco de dados esteja no padrão utf-8 e faça o seguinte comando SQL
```
CREATE TABLE `nome_do_banco`.`pessoas`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(120) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `sobrenome` VARCHAR(120) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `nacionalidade` VARCHAR(120) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `cep` VARCHAR(9) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `estado` VARCHAR(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `cidade` VARCHAR(120) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `logradouro` VARCHAR(120) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `email` VARCHAR(120) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `telefone` VARCHAR(14) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = INNODB;
```

<strong>IMPORTANTE:</strong> Não esqueça de atualizar as informações do seu servidor MySQL dentro dos códigos

<br>

Dessa vez faça o seguinte comando no terminal em que o projeto está aberto
```
cd client/
yarn
```

<br>

Agora, vamos instalar as dependências do server-side
```
cd server/
yarn
```

<br>

Pronto!! Todas as dependências foram instaladas e agora é só iniciar o servidor
```
cd client/
yarn start

cd server/
node index.js
```

***
