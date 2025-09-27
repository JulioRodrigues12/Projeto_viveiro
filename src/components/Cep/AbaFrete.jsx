import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { PedidoContext } from "../Pedido/Pedido";
import "./AbaFrete.css";

export function AbaFrete() {
  const { pedido } = useContext(PedidoContext);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [emailErro, setEmailErro] = useState("");
  const [telefone, setTelefone] = useState("");
  const [telefoneErro, setTelefoneErro] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCepChange = (e) => {
    const cepValue = e.target.value;
    const cepFormatado = cepValue.replace(/\D/g,'').replace(/^(\d{5})(\d)/,'$1-$2').slice(0,9);
    setCep(cepFormatado);
  };

  const handleBuscarCep = async () => {
    if(cep.length !== 9){
      setError("CEP inválido");
      setEndereco(null);
      return;
    }
    setLoading(true);
    setError(null);
    setEndereco(null);

    try{
      const resp = await fetch(`https://viacep.com.br/ws/${cep.replace('-','')}/json/`);
      const data = await resp.json();
      if(data.erro){
        setError("CEP não encontrado");
        setEndereco(null);
      } else {
        setEndereco(data);
      }
    } catch(err){
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
  const numeros = valor.replace(/\D/g, "").slice(0, 11); // Limita a 11 dígitos
  if (numeros.length <= 2) return `(${numeros}`;
  if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
};

const dddsValidos = [
  "11","12","13","14","15","16","17","18","19", // SP
  "21","22","24", // RJ
  "27","28", // ES
  "31","32","33","34","35","37","38", // MG
  "41","42","43","44","45","46", // PR
  "47","48","49", // SC
  "51","53","54","55", // RS
  "61", // DF
  "62","64", // GO
  "63", // TO
  "65","66", // MT
  "67", // MS
  "68", // AC
  "69", // RO
  "71","73","74","75","77", // BA
  "79", // SE
  "81","87", // PE
  "82", // AL
  "83", // PB
  "84", // RN
  "85","88", // CE
  "86","89", // PI
  "91","93","94", // PA
  "92","97", // AM
  "95", // RR
  "96", // AP
  "98","99" // MA
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
    if(!endereco){
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
      nome,
      email,
      telefone,
      cep,
      rua: endereco.logradouro,
      bairro: endereco.bairro,
      cidade: endereco.localidade,
      estado: endereco.uf,
      pedido
    };

   const textoWhats = 
`📦 *Pedido de ${dadosEnvio.nome}*

👤 *Nome:* ${dadosEnvio.nome}
📧 *Email:* ${dadosEnvio.email}
📞 *Telefone:* ${dadosEnvio.telefone}

📍 *Endereço:*
• Rua: ${dadosEnvio.rua}
• Bairro: ${dadosEnvio.bairro}
• Cidade: ${dadosEnvio.cidade} - ${dadosEnvio.estado}
• CEP: ${dadosEnvio.cep}

🛒 *Itens do Pedido:*
${dadosEnvio.pedido.itens.length > 0 
  ? dadosEnvio.pedido.itens.map(item => `• ${item.nome} x${item.quantidade} - R$ ${item.preco.toFixed(2)}`).join('\n') 
  : 'Nenhum item selecionado'}

💰 *Total:* R$ ${dadosEnvio.pedido.total.toFixed(2)}

⚠️ O frete deve ser combinado por mensagem.
`;


    const urlWhats = `https://wa.me/?text=${encodeURIComponent(textoWhats)}`;
    window.open(urlWhats,"_blank");
  };

  return (
    <div className="frete-container">
      <h2>Dados para Entrega</h2>
      <p className="frete-subtitulo">Preencha seus dados e CEP para enviar o pedido.</p>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Nome</label>
          <input className="input-text" value={nome} onChange={e => setNome(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
    className="input-text"
    type="email"
    value={email}
    onChange={e => setEmail(e.target.value)}
    onBlur={validarEmail} // valida ao sair do campo
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
  onChange={e => setTelefone(formatarTelefone(e.target.value))}
  onBlur={validarTelefone}
  placeholder="(00) 00000-0000"
  required
/>
  {telefoneErro && <p className="mensagem-erro">{telefoneErro}</p>}
        </div>
        <div className="form-group-cep">
          <div className="cep-container">
            <label>CEP</label>
            <input className="input-cep" value={cep} onChange={handleCepChange} placeholder="00000-000" required/>
          </div>
          <button type="button" className="btn-buscar-cep" onClick={handleBuscarCep} disabled={loading}>
            {loading ? "..." : "Buscar CEP"}
          </button>
        </div>
        {error && <p className="mensagem-erro">{error}</p>}
        <div className="form-group">
          <label>Rua</label>
          <input className="input-text" value={endereco?.logradouro || ""} readOnly/>
        </div>
        <div className="form-group">
          <label>Bairro</label>
          <input className="input-text" value={endereco?.bairro || ""} readOnly/>
        </div>
        <div className="form-grid-duplo">
          <div className="form-group">
            <label>Cidade</label>
            <input className="input-text" value={endereco?.localidade || ""} readOnly/>
          </div>
          <div className="form-group">
            <label>Estado</label>
            <input className="input-text" value={endereco?.uf || ""} readOnly/>
          </div>
        </div>
        <button type="submit" className="btn-submit-form" disabled={!endereco}>Enviar Pedido</button>
      </form>

      <div className="resultado-container">
        <div className="frete-resultado">
          <p style={{fontWeight:"bold", color:"#333"}}>
            ⚠️ O frete deve ser combinado por mensagem.
          </p>
        </div>
      </div>

      <Link to="/"><button className="botao-inicio-fixo">Início</button></Link>
    </div>
  );
}
