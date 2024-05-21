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

Em client/src/App.js, modifique a url do localhost para a url que abrirá no seu server/index.js
<br>
<strong>OBS:</strong> As linhas podem estar em posições diferentes
```
72    Axios.get("localhost:3001/pessoas").then((response) => {

144   Axios.delete(`localhost:3001/delete/${id}`);

153   Axios.put("localhost:3001/update", {

172   Axios.post("localhost:3001/create", {
```

<br>

Agora em server/index.js, modifique as informações do seu servidor MySQL
<br>
<strong>OBS:</strong> As linhas podem estar em posições diferentes
```
 9    const db = mysql.createConnection({
10      user: "user",
11      host: "host",
12      password: "password",
13      database: "database",
14    });
```

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
