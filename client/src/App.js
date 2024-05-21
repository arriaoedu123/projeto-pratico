import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import "./App.css";

import { FaList } from "react-icons/fa";
import Ripples from "react-ripples";

function App() {
  const { register, setValue } = useForm();

  // função para auxiliar a função onSubmit
  const state = {
    button: 1,
  };

  // função para formatar o cep (00000-000)
  const formatarCep = (e) => {
    if (e.target.value.length == 5) {
      e.target.value += "-";
    }
  };

  // função para formatar o telefone ((11) 1234-5678)
  const formatarTel = (e) => {
    if (e.target.value.length === 0) {
      e.target.value += "(";
    } else if (e.target.value.length === 3) {
      e.target.value += ")";
      e.target.value += " ";
    } else if (e.target.value.length === 9) {
      e.target.value += "-";
    }
  };

  // função para preencher os campos de acordo com o CEP inserido
  const checarCep = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue("estado", data.uf);
        setValue("cidade", data.localidade);
        setValue("logradouro", data.logradouro);
        setCep(e.target.value);
        setEstado(data.uf);
        setCidade(data.localidade);
        setLogradouro(data.logradouro);
        document.querySelector("#email-input").focus();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // valores que serão enviados ao banco de dados
  var [id, setId] = useState("");
  var [nome, setNome] = useState("");
  var [sobrenome, setSobrenome] = useState("");
  var [nacionalidade, setNacionalidade] = useState("");
  var [cep, setCep] = useState("");
  var [estado, setEstado] = useState("");
  var [cidade, setCidade] = useState("");
  var [logradouro, setLogradouro] = useState("");
  var [email, setEmail] = useState("");
  var [telefone, setTelefone] = useState("");

  const [listaPessoas, verListaPessoas] = useState([]);

  // função Read do CRUD
  const verPessoas = () => {
    Axios.get("localhost:3001/pessoas").then((response) => {
      verListaPessoas(response.data);
    }).catch(() => {
      window.alert("Ocorreu um erro!");
    });
  };

  // função para setar os campos do formulário para o Edit do CRUD
  const setarCampos = (
    id,
    nome,
    sobrenome,
    nacionalidade,
    cep,
    estado,
    cidade,
    logradouro,
    email,
    telefone
  ) => {
    document.querySelector(".button-add").disabled = true;
    document.querySelector(".button-edit").disabled = false;
    document.querySelector(".separator-title").innerHTML = "Editar pessoa";
    document.querySelector(".button-cancel-label").innerHTML = "CANCELAR";

    window.scrollTo(0, 0);
    document.querySelector("#nome-input").focus();

    setValue("nome", nome);
    setValue("sobrenome", sobrenome);
    setValue("nacionalidade", nacionalidade);
    setValue("cep", cep);
    setValue("estado", estado);
    setValue("cidade", cidade);
    setValue("logradouro", logradouro);
    setValue("email", email);
    setValue("telefone", telefone);

    setId(id);
    setNome(nome);
    setSobrenome(sobrenome);
    setNacionalidade(nacionalidade);
    setCep(cep);
    setEstado(estado);
    setCidade(cidade);
    setLogradouro(logradouro);
    setEmail(email);
    setTelefone(telefone);
  };

  // função que reseta os campos do formulário

  const limparCampos = () => {
    setValue("nome", "");
    setValue("sobrenome", "");
    setValue("nacionalidade", "");
    setValue("cep", "");
    setValue("estado", " ");
    setValue("cidade", "");
    setValue("logradouro", "");
    setValue("email", "");
    setValue("telefone", "");

    document.querySelector(".button-add").disabled = false;
    document.querySelector(".button-edit").disabled = true;
    document.querySelector(".separator-title").innerHTML = "Adicionar pessoa";
    document.querySelector(".button-cancel-label").innerHTML = "LIMPAR";
  };

  // função Delete do CRUD
  const deletarPessoa = (id) => {
    if (window.confirm("Deseja deletar essa pessoa?") == true) {
      Axios.delete(`localhost:3001/delete/${id}`);
      verPessoas();
    }
  };

  // funções Update e Create do CRUD
  const onSubmit = (e) => { // função Update do CRUD
    e.preventDefault();
    if (state.button === 1) {
      Axios.put("localhost:3001/update", {
        nome: nome,
        sobrenome: sobrenome,
        nacionalidade: nacionalidade,
        cep: cep,
        estado: estado,
        cidade: cidade,
        logradouro: logradouro,
        email: email,
        telefone: telefone,
        id: id,
      }).then(() => {
        limparCampos();
        verPessoas();
        window.alert("Editado com sucesso!");
      }).catch(() => {
        window.alert("Ocorreu um erro!")
      });
    } else if (state.button === 2) { // função Create do CRUD
      Axios.post("localhost:3001/create", {
        nome: nome,
        sobrenome: sobrenome,
        nacionalidade: nacionalidade,
        cep: cep,
        estado: estado,
        cidade: cidade,
        logradouro: logradouro,
        email: email,
        telefone: telefone,
      }).then(() => {
        limparCampos();
        verPessoas();
        window.alert("Adicionado com sucesso!");
      }).catch(() => {
        window.alert("Ocorreu um erro!");
      });
    }
  };

  return (
    <div className="App">

      {/* -----corpo do CRUD Create----- */}
      <form action="" onSubmit={onSubmit} className="form" id="form">
        {/* título do CRUD Create */}
        <div className="center-separator-crud">
          <div className="separator">
            <span className="separator-title" id="separator-title">
              Adicionar cliente
            </span>
          </div>
        </div>

        {/* corpo do campo de nome */}
        <div className="nome-div">
          <label htmlFor="nome-input" className="label">
            Nome
          </label>
          <input
            type="text"
            {...register("nome")}
            className="input"
            id="nome-input"
            placeholder="Ex.: Marcos"
            onChange={(event) => {
              setNome(event.target.value);
            }}
            required
          />
        </div>

        {/* corpo do campo de sobrenome */}
        <div className="sobrenome-div">
          <label htmlFor="sobrenome-input" className="label">
            Sobrenome
          </label>
          <input
            type="text"
            {...register("sobrenome")}
            className="input"
            id="sobrenome-input"
            placeholder="Ex.: Cabral"
            onChange={(event) => {
              setSobrenome(event.target.value);
            }}
            required
          />
        </div>

        {/* corpo do campo de nacionalidade */}
        <div className="nacionalidade-div">
          <label htmlFor="nacionalidade-input" className="label">
            Nacionalidade
          </label>
          <input
            type="text"
            {...register("nacionalidade")}
            name="nacionalidade"
            className="input"
            id="nacionalidade-input"
            placeholder="Ex.: Brasileira"
            onChange={(event) => {
              setNacionalidade(event.target.value);
            }}
            required
          />
        </div>

        {/* corpo do campo do cep */}
        <div className="cep-div">
          <label htmlFor="cep-input" className="label">
            CEP
          </label>
          <input
            type="text"
            {...register("cep")}
            className="input"
            id="cep-input"
            placeholder="Ex.: 05165-240"
            onBlur={checarCep}
            onKeyPress={formatarCep}
            maxLength="9"
            required
          />
        </div>

        {/* corpo do campo do estado */}
        <div className="estado-div">
          <label htmlFor="estado-input" className="label">
            Estado
          </label>
          <select
            {...register("estado")}
            className="input"
            id="estado-input"
            defaultValue={" "}
            onChange={(event) => {
              setEstado(event.target.value);
            }}
          >
            <option value=" " disabled>
              Selecione
            </option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
        </div>

        {/* corpo do campo da cidade */}
        <div className="cidade-div">
          <label htmlFor="cidade-input" className="label">
            Cidade
          </label>
          <input
            type="text"
            {...register("cidade")}
            className="input"
            id="cidade-input"
            placeholder="Ex.: São Paulo"
            onChange={(event) => {
              setCidade(event.target.value);
            }}
            required
          />
        </div>

        {/* corpo do campo de logradouro */}
        <div className="logradouro-div">
          <label htmlFor="logradouro-input" className="label">
            Logradouro
          </label>
          <input
            type="text"
            {...register("logradouro")}
            className="input"
            id="logradouro-input"
            placeholder="Ex.: Rua São Bento"
            onChange={(event) => {
              setLogradouro(event.target.value);
            }}
            required
          />
        </div>

        {/* corpo do campo de email */}
        <div className="email-div">
          <label htmlFor="email-input" className="label">
            E-mail
          </label>
          <input
            type="email"
            {...register("email")}
            className="input"
            id="email-input"
            placeholder="Ex.: exemplo@email.com"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
        </div>

        {/* corpo do campo de telefone */}
        <div className="telefone-div">
          <label htmlFor="telefone-input" className="label">
            Telefone
          </label>
          <input
            type="tel"
            {...register("telefone")}
            className="input"
            id="telefone-input"
            placeholder="Ex.: (11) 1234-5678"
            onChange={(event) => {
              setTelefone(event.target.value);
            }}
            onKeyPress={formatarTel}
            maxLength="14"
            required
          />
        </div>

        {/* corpo dos botões do formulário */}
        <div className="buttons-div">

          {/* corpo do botão do CRUD Create */}
          <div className="button-add-div" id="button-add-div">
            <button
              type="submit"
              onClick={() => (state.button = 2)}
              className="button-add btn"
            >
              <p>ADICIONAR</p>
            </button>
          </div>

          {/* corpo do botão do CRUD Update */}
          <div className="button-edit-div" id="button-edit-div">
            <button
              type="submit"
              onClick={() => (state.button = 1)}
              className="button-edit btn"
              disabled
            >
              <p>CONFIRMAR</p>
            </button>
          </div>

          {/* corpo do botão de limpar os campos */}
          <div className="button-cancel-div">
            <button
              onClick={limparCampos}
              type="button"
              className="button-cancel btn"
            >
              <p className="button-cancel-label">LIMPAR</p>
            </button>
          </div>
        </div>
      </form>
      {/* ------------------------------ */}

      {/* ------corpo do CRUD Read------ */}
      <div className="lista-cadastro">
        {/* corpo do título do CRUD Read*/}
        <div className="center-separator">
          <div className="separator">
            <span>Lista de clientes</span>
          </div>
        </div>

        {/* corpo do botão para listar as pessoas */}
        <div className="crud-read-div">
          <Ripples className="crud-read-button-div">
            <button
              type="button"
              onClick={verPessoas}
              className="crud-read-button"
            >
              <FaList className="icon" />
            </button>
          </Ripples>
        </div>

        {/* corpo da área em que as pessoas são listadas */}
        <div className="lista-pessoas">

          {/* corpo da função para listar todas as pessoas registradas no banco de dados */}
          {listaPessoas.map((val, key) => {
            return (
              <div className="pessoa">
                <div className="center-separator-crud">
                  <div className="separator">
                    <span className="separator-title" id="separator-title">
                      #{val.id}
                    </span>
                  </div>
                </div>
                <h3 className="info-header">
                  <span className="info">NOME:</span>
                  <span className="info-valor">{val.nome}</span>
                </h3>
                <h3 className="info-header">
                  <span className="info">SOBRENOME:</span>
                  <span className="info-valor">{val.sobrenome}</span>
                </h3>
                <h3 className="info-header">
                  <span className="info">NACIONALIDADE:</span>
                  <span className="info-valor">{val.nacionalidade}</span>
                </h3>
                <h3 className="info-header">
                  <span className="info">CEP:</span>
                  <span className="info-valor">{val.cep}</span>
                </h3>
                <h3 className="info-header">
                  <span className="info">ESTADO:</span>
                  <span className="info-valor">{val.estado}</span>
                </h3>
                <h3 className="info-header">
                  <span className="info">CIDADE:</span>
                  <span className="info-valor">{val.cidade}</span>
                </h3>
                <h3 className="info-header">
                  <span className="info">LOGRADOURO:</span>
                  <span className="info-valor">{val.logradouro}</span>
                </h3>
                <h3 className="info-header">
                  <span className="info">E-MAIL:</span>
                  <span className="info-valor">{val.email}</span>
                </h3>
                <h3 className="info-header">
                  <span className="info">TELEFONE:</span>
                  <span className="info-valor">{val.telefone}</span>
                </h3>
                <div className="read-buttons">
                  <button
                    type="button"
                    className="button-read-edit btn"
                    onClick={() => {
                      setarCampos(
                        val.id,
                        val.nome,
                        val.sobrenome,
                        val.nacionalidade,
                        val.cep,
                        val.estado,
                        val.cidade,
                        val.logradouro,
                        val.email,
                        val.telefone
                      );
                    }}
                  >
                    <p>EDITAR</p>
                  </button>
                  <button
                    type="button"
                    className="button-delete btn"
                    onClick={() => {
                      deletarPessoa(val.id);
                      verPessoas();
                    }}
                  >
                    <p>DELETAR</p>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* ------------------------------ */}

    </div>
  );
}

export default App;
