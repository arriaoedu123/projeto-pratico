const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "user",
  host: "host",
  password: "password",
  database: "database",
});

app.post("/create", (req, res) => {
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  const nacionalidade = req.body.nacionalidade;
  const cep = req.body.cep;
  const estado = req.body.estado;
  const cidade = req.body.cidade;
  const logradouro = req.body.logradouro;
  const email = req.body.email;
  const telefone = req.body.telefone;

  db.query(
    "INSERT INTO pessoas (nome, sobrenome, nacionalidade, cep, estado, cidade, logradouro, email, telefone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      nome,
      sobrenome,
      nacionalidade,
      cep,
      estado,
      cidade,
      logradouro,
      email,
      telefone,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("sucesso");
      }
    }
  );
});

app.get("/pessoas", (req, res) => {
  db.query("SELECT * FROM pessoas", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  const nacionalidade = req.body.nacionalidade;
  const cep = req.body.cep;
  const estado = req.body.estado;
  const cidade = req.body.cidade;
  const logradouro = req.body.logradouro;
  const email = req.body.email;
  const telefone = req.body.telefone;
  db.query(
    "UPDATE pessoas SET nome = ?, sobrenome = ?, nacionalidade = ?, cep = ?, estado = ?, cidade = ?, logradouro = ?, email = ?, telefone = ? WHERE id = ?",
    [
      nome,
      sobrenome,
      nacionalidade,
      cep,
      estado,
      cidade,
      logradouro,
      email,
      telefone,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM pessoas WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Servidor aberto na porta 3001");
});
