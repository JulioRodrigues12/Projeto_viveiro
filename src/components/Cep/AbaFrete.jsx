// src/components/AbaFrete/AbaFrete.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // PASSO 1: Importar o Link
import './AbaFrete.css';

export function AbaFrete() {
  // ... (toda a sua lógica de state e funções handle permanece aqui, sem alterações)
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [freteInfo, setFreteInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCepChange = (e) => {
    const cepValue = e.target.value;
    const cepFormatado = cepValue
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);
    setCep(cepFormatado);
  };

  const handleBuscarCep = async () => {
    if (cep.length !== 9) {
      setError('CEP inválido. Por favor, digite os 8 números.');
      setEndereco(null);
      setFreteInfo(null);
      return;
    }

    setLoading(true);
    setError(null);
    setEndereco(null);
    setFreteInfo(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError('CEP não encontrado. Verifique o número digitado.');
        setEndereco(null);
      } else {
        setEndereco(data);
        simularCalculoFrete(data);
      }
    } catch (err) {
      setError('Não foi possível buscar o CEP. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!endereco) {
        alert("Por favor, busque por um CEP válido antes de enviar.");
        return;
    }
    const formData = {
        nome,
        email,
        cep,
        rua: endereco.logradouro,
        bairro: endereco.bairro,
        cidade: endereco.localidade,
        estado: endereco.uf
    };
    console.log("Dados do formulário para enviar:", formData);
    alert(`Cadastro de ${nome} enviado com sucesso!`);
  };

  const simularCalculoFrete = (enderecoData) => {
    let valorFrete = 15.00;
    let prazo = 7;
    const capitaisSudeste = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Vitória'];
    if (capitaisSudeste.includes(enderecoData.localidade)) {
      valorFrete = 10.00;
      prazo = 3;
    }
    setFreteInfo({
      valor: `R$ ${valorFrete.toFixed(2).replace('.', ',')}`,
      prazo: `${prazo} dias úteis`
    });
  }

  return (
    <> { /* O componente agora é envolvido por um fragmento */ }
      <div className="frete-container">
        { /* Todo o seu formulário e lógica de exibição continuam aqui dentro... */ }
        <form onSubmit={handleFormSubmit}>
            <h2>Dados para Entrega</h2>
            <p className="frete-subtitulo">Preencha seus dados e CEP para calcularmos o frete.</p>

            <div className="form-group">
              <label htmlFor="nome">Nome Completo</label>
              <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="form-group-cep">
              <div style={{ flex: 1 }}>
                <label htmlFor="cep">CEP:</label>
                <input type="text" id="cep" value={cep} onChange={handleCepChange} placeholder="00000-000" required />
              </div>
              <button type="button" className="btn-buscar-cep" onClick={handleBuscarCep} disabled={loading}>
                {loading ? '...' : 'Buscar CEP'}
              </button>
            </div>
            
            {loading && <p className="mensagem-loading">Buscando...</p>}
            {error && <p className="mensagem-erro">{error}</p>}

            <div className="form-group">
              <label htmlFor="rua">Rua</label>
              <input type="text" id="rua" value={endereco?.logradouro || ''} readOnly />
            </div>
            
            <div className="form-group">
              <label htmlFor="bairro">Bairro</label>
              <input type="text" id="bairro" value={endereco?.bairro || ''} readOnly />
            </div>

            <div className="form-grid-duplo">
              <div className="form-group">
                <label htmlFor="cidade">Cidade</label>
                <input type="text" id="cidade" value={endereco?.localidade || ''} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <input type="text" id="estado" value={endereco?.uf || ''} readOnly />
              </div>
            </div>
            
            <button type="submit" className="btn-submit-form" disabled={!endereco}>
              Enviar Cadastro
            </button>
        </form>

        {freteInfo && (
          <div className="resultado-container">
            <div className="frete-resultado">
              <h3>Opção de Entrega:</h3>
              <p><strong>Valor:</strong> {freteInfo.valor}</p>
              <p><strong>Prazo estimado:</strong> {freteInfo.prazo}</p>
            </div>
          </div>
        )}
      </div>

      {/* PASSO 2: Adicionar o Link e o botão fixo aqui */}
      <Link to="/">
        <button className="botao-inicio-fixo">Início</button>
      </Link>
    </>
  );
}