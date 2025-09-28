import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { PedidoContext } from "../Pedido/Pedido";
import "./AbaFrete.css";

export function AbaFrete() {
  const { pedido } = useContext(PedidoContext);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [emailErro, setEmailErro] = useState("");
  const [telefone, setTelefone] = useState("");
  const [telefoneErro, setTelefoneErro] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [numeroCasa, setNumeroCasa] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCepChange = (e) => {
    const cepValue = e.target.value;
    const cepFormatado = cepValue
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
    setCep(cepFormatado);
  };

  const handleBuscarCep = async () => {
    if (cep.length !== 9) {
      setError("CEP inválido");
      setEndereco(null);
      return;
    }
    setLoading(true);
    setError(null);
    setEndereco(null);

    try {
      const resp = await fetch(
        `https://viacep.com.br/ws/${cep.replace("-", "")}/json/`
      );
      const data = await resp.json();
      if (data.erro) {
        setError("CEP não encontrado");
        setEndereco(null);
      } else {
        setEndereco(data);
      }
    } catch (err) {
      setError("Não foi possível buscar o CEP");
    } finally {
      setLoading(false);
    }
  };

  const validarEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailErro("Por favor informe um email válido");
      return;
    }
    setEmailErro("");
  };

  const formatarTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    if (numeros.length <= 2) return `(${numeros}`;
    if (numeros.length <= 7)
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(
      7
    )}`;
  };

  const dddsValidos = [
    "11","12","13","14","15","16","17","18","19",
    "21","22","24",
    "27","28",
    "31","32","33","34","35","37","38",
    "41","42","43","44","45","46",
    "47","48","49",
    "51","53","54","55",
    "61",
    "62","64",
    "63",
    "65","66",
    "67",
    "68",
    "69",
    "71","73","74","75","77",
    "79",
    "81","87",
    "82",
    "83",
    "84",
    "85","88",
    "86","89",
    "91","93","94",
    "92","97",
    "95",
    "96",
    "98","99"
  ];

  const validarTelefone = () => {
    const numeros = telefone.replace(/\D/g, "");
    const ddd = numeros.slice(0, 2);
    const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-\d{4}$/;

    if (!telefoneRegex.test(telefone) || !dddsValidos.includes(ddd)) {
      setTelefoneErro("Informe um telefone válido com DDD brasileiro");
    } else {
      setTelefoneErro("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!endereco) {
      alert("Busque um CEP válido antes de enviar");
      return;
    }

    if (!email || emailErro) {
      setEmailErro("Informe um email válido");
      return;
    }

if (!telefone || telefoneErro) {
  setTelefoneErro("Informe um telefone válido com DDD brasileiro");
  return;
    }

    const dadosEnvio = {
      nomeCompleto,
      email,
      telefone,
      cep,
      rua: endereco.logradouro,
      numeroCasa,
      bairro: endereco.bairro,
      cidade: endereco.localidade,
      estado: endereco.uf,
      pedido,
    };

    const textoWhats = `📦 *Pedido de ${dadosEnvio.nomeCompleto}*

 *Nome completo:* ${dadosEnvio.nomeCompleto}
 *Email:* ${dadosEnvio.email}
 *Telefone:* ${dadosEnvio.telefone}

 *Endereço:*
• Rua: ${dadosEnvio.rua}, Nº ${dadosEnvio.numeroCasa}
• Bairro: ${dadosEnvio.bairro}
• Cidade: ${dadosEnvio.cidade} - ${dadosEnvio.estado}
• CEP: ${dadosEnvio.cep}

 *Itens do Pedido:*
${
  dadosEnvio.pedido.itens.length > 0
    ? dadosEnvio.pedido.itens
        .map(
          (item) =>
            `• ${item.nome} x${item.quantidade} - R$ ${item.preco.toFixed(2)}`
        )
        .join("\n")
    : "Nenhum item selecionado"
}

💰 *Total:* R$ ${dadosEnvio.pedido.total.toFixed(2)}

⚠️ O frete deve ser combinado por mensagem.
`;

    const urlWhats = `https://wa.me/5532984586277/?text=${encodeURIComponent(
      textoWhats
    )}`;
    window.open(urlWhats, "_blank");
  };

  return (
    <div className="frete-container">
      <h2>Dados para Entrega</h2>
      <p className="frete-subtitulo">
        Preencha seus dados e CEP para enviar o pedido.
      </p>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Nome completo</label>
          <input
            className="input-text"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="input-text"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validarEmail}
            required
          />
          {emailErro && <p className="mensagem-erro">{emailErro}</p>}
        </div>
        <div className="form-group">
          <label>Telefone</label>
          <input
            className="input-text"
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
            onBlur={validarTelefone}
            placeholder="(00) 00000-0000"
            required
          />
          {telefoneErro && <p className="mensagem-erro">{telefoneErro}</p>}
        </div>
        <div className="form-group-cep">
          <div className="cep-container">
            <label>CEP</label>
            <input
              className="input-cep"
              value={cep}
              onChange={handleCepChange}
              placeholder="00000-000"
              required
            />
          </div>
          <button
            type="button"
            className="btn-buscar-cep"
            onClick={handleBuscarCep}
            disabled={loading}
          >
            {loading ? "..." : "Buscar CEP"}
          </button>
        </div>
        {error && <p className="mensagem-erro">{error}</p>}
        <div className="form-group">
          <label>Rua</label>
          <input
            className="input-text"
            value={endereco?.logradouro || ""}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Número da casa</label>
          <input
            className="input-text"
            value={numeroCasa}
            onChange={(e) => setNumeroCasa(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Bairro</label>
          <input
            className="input-text"
            value={endereco?.bairro || ""}
            readOnly
          />
        </div>
        <div className="form-grid-duplo">
          <div className="form-group">
            <label>Cidade</label>
            <input
              className="input-text"
              value={endereco?.localidade || ""}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Estado</label>
            <input
              className="input-text"
              value={endereco?.uf || ""}
              readOnly
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn-submit-form"
          disabled={!endereco}
        >
          Enviar Pedido
        </button>
      </form>

      <div className="resultado-container">
        <div className="frete-resultado">
          <p style={{ fontWeight: "bold", color: "#333" }}>
            ⚠️ O frete deve ser combinado por mensagem.
          </p>
        </div>
      </div>

      <Link to="/">
        <button className="botao-inicio-fixo">Início</button>
      </Link>
    </div>
  );
}
