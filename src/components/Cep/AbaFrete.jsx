import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { PedidoContext } from "../Pedido/Pedido";
import "./AbaFrete.css";

export function AbaFrete() {
  const { pedido } = useContext(PedidoContext);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(!endereco){
      alert("Busque um CEP válido antes de enviar");
      return;
    }

    // Validação simples de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      alert("Informe um email válido");
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

    const textoWhats = `Pedido de ${nome}:\n` + JSON.stringify(dadosEnvio, null, 2) +
      `\n\n⚠️ O frete deve ser combinado por mensagem.`;

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
          <input className="input-text" type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label>Telefone</label>
          <input className="input-text" type="tel" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(00) 00000-0000" required/>
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
