import React, { useState } from "react";
import "./index.css";
import {
  FaInstagram,
  FaRegEnvelope,
  FaFacebookSquare,
  FaTrashAlt,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaBolt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export function AbaPrincipal() {
  const produtos = {
    prod1: { nome: "Bananeira", tipo: "Frutífera", descricao: "Muda de bananeira saudável." },
    prod2: { nome: "Laranjeira", tipo: "Frutífera", descricao: "Muda de laranjeira doce." },
    prod3: { nome: "Manga", tipo: "Frutífera", descricao: "Muda de mangueira vigorosa." },
    prod4: { nome: "Ipê Amarelo", tipo: "Nativa", descricao: "Muda de ipê amarelo nativo." },
    prod5: { nome: "Jacarandá", tipo: "Nativa", descricao: "Muda de jacarandá ornamental." },
    prod6: { nome: "Figueira", tipo: "Nativa", descricao: "Muda de figueira robusta." },
    prod7: { nome: "Rosa do Deserto", tipo: "Ornamental", descricao: "Muda ornamental colorida." },
    prod8: { nome: "Hibisco", tipo: "Ornamental", descricao: "Muda de hibisco florida." },
    prod9: { nome: "Orquídea", tipo: "Ornamental", descricao: "Muda de orquídea delicada." },
    prod10: { nome: "Abacateiro", tipo: "Frutífera", descricao: "Muda de abacateiro produtiva." },
    prod11: { nome: "Cajueiro", tipo: "Frutífera", descricao: "Muda de cajueiro resistente." },
    prod12: { nome: "Azaleia", tipo: "Ornamental", descricao: "Muda de azaleia florida." },
  };

  const precos = {
    prod1: 30.0, prod2: 45.0, prod3: 39.99, prod4: 19.9,
    prod5: 55.5, prod6: 60.0, prod7: 25.0, prod8: 18.75,
    prod9: 33.3, prod10: 49.99, prod11: 22.0, prod12: 30.0,
  };

  const imagens = {
    prod1: "https://picsum.photos/id/1011/260/160",
    prod2: "https://picsum.photos/id/1012/260/160",
    prod3: "https://picsum.photos/id/1013/260/160",
    prod4: "https://picsum.photos/id/1015/260/160",
    prod5: "https://picsum.photos/id/1016/260/160",
    prod6: "https://picsum.photos/id/1018/260/160",
    prod7: "https://picsum.photos/id/1020/260/160",
    prod8: "https://picsum.photos/id/1021/260/160",
    prod9: "https://picsum.photos/id/1022/260/160",
    prod10: "https://picsum.photos/id/1023/260/160",
    prod11: "https://picsum.photos/id/1024/260/160",
    prod12: "https://picsum.photos/id/1025/260/160",
  };

  const [carrinho, setCarrinho] = useState([]);
  const [quantidades, setQuantidades] = useState(
    Object.keys(produtos).reduce((acc, id) => ({ ...acc, [id]: 1 }), {})
  );
  const [filtro, setFiltro] = useState("Todos");

  const alterarQuantidade = (id, valor) => {
    setQuantidades(prev => ({ ...prev, [id]: Math.max(1, prev[id] + valor) }));
  };

  const adicionarAoCarrinho = (id) => {
    const qtd = quantidades[id];
    const preco = precos[id];

    setCarrinho(prev => {
      const existe = prev.find(item => item.id === id);
      if (existe) {
        return prev.map(item => item.id === id ? { ...item, quantidade: item.quantidade + qtd } : item);
      }
      return [...prev, { id, preco, quantidade: qtd }];
    });

    setQuantidades(prev => ({ ...prev, [id]: 1 }));
  };

  const quantidadeTotal = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const precoTotal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const diminuirQuantidadeCarrinho = (id) => {
    setCarrinho(prev =>
      prev.map(item => item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item)
          .filter(item => item.quantidade > 0)
    );
  };

  const removerItem = (id) => setCarrinho(prev => prev.filter(item => item.id !== id));
  const limparCarrinho = () => setCarrinho([]);

 
  const finalizarPedido = () => {
    if (window.confirm(`Deseja realmente finalizar o pedido de R$ ${precoTotal.toFixed(2)} (${quantidadeTotal} itens)?`)) {
      alert("Pedido finalizado! Em breve será enviado via WhatsApp.");
      setCarrinho([]);
    }
  };

  const produtosFiltrados = Object.entries(produtos).filter(([id, prod]) => {
    if (filtro === "Todos") return true;
    return prod.tipo === filtro;
  });

  return (
    <div className={`container ${quantidadeTotal > 0 ? "com-carrinho" : ""}`}>
      <header>
        <div className="cabecalho">
          <img src="src/assets/e66b6fdbd5f365cefc42b9c4f4cb976eb0d9380e.png" alt="Logo" />
          <h1>Contatos</h1>
          <ul className="contatos-lista">
            <li><a href="https://www.instagram.com/lucianoplantas2" target="_blank" rel="noopener noreferrer" className="contato-link insta"><FaInstagram /> Instagram</a></li>
            <li><a href="mailto:seuemail@exemplo.com" className="contato-link email"><FaRegEnvelope /> Email</a></li>
            <li><a href="https://www.facebook.com/share/15W5guHPr3/" target="_blank" rel="noopener noreferrer" className="contato-link facebook"><FaFacebookSquare /> Facebook</a></li>
          </ul>
        </div>
        <nav>
          <ul>
            <li><Link to="/trabalho">Nosso Trabalho</Link></li>
            <li><Link to="/sobre">Sobre Nós</Link></li>
            <li><Link to="/cep">Calcule seu Frete</Link></li>
           
          </ul>
        </nav>
      </header>

      <main>
        <div className="main-header"><h1>Catálogo</h1></div>

        <div className="filtros">
          {["Todos", "Frutífera", "Nativa", "Ornamental"].map(tipo => (
            <button
              key={tipo}
              className={`btn-filtro ${filtro === tipo ? "ativo" : ""}`}
              onClick={() => setFiltro(tipo)}
            >
              {tipo}
            </button>
          ))}
        </div>

        <div className="produtos">
          {produtosFiltrados.map(([id, prod]) => (
            <div key={id} className="card">
              <img src={imagens[id]} alt={prod.nome} className="card-imagem" />
              <h3>{prod.nome}</h3>
              <p>{prod.descricao}</p>
              <div className="card-preco">R$ {precos[id].toFixed(2)}</div>
              <div className="secao-compras">
                <div className="controles-quantidade">
                  <button onClick={() => alterarQuantidade(id, -1)}><FaMinus /></button>
                  <input
                    type="number"
                    min="1"
                    value={quantidades[id]}
                    onChange={(e) => setQuantidades(prev => ({ ...prev, [id]: Math.max(1, parseInt(e.target.value) || 1) }))}
                  />
                  <button onClick={() => alterarQuantidade(id, 1)}><FaPlus /></button>
                </div>
                <button className="btn-adicionar" onClick={() => adicionarAoCarrinho(id)}><FaShoppingCart /> Adicionar</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {quantidadeTotal > 0 && (
        <aside className="carrinho-lateral">
          <div className="carrinho-header">
            <h2>Carrinho ({quantidadeTotal} itens)</h2>
            <button className="btn-fechar" onClick={limparCarrinho}><FaTrashAlt /></button>
          </div>
          <ul>
            {carrinho.map(item => (
              <li key={item.id} className="item-carrinho">
                {produtos[item.id].nome} (x{item.quantidade}) - R$ {(item.preco * item.quantidade).toFixed(2)}
                <button onClick={() => diminuirQuantidadeCarrinho(item.id)}><FaMinus /></button>
                <button onClick={() => removerItem(item.id)}><FaTrashAlt /></button>
              </li>
            ))}
          </ul>
          <div className="total">Total: R$ {precoTotal.toFixed(2)}</div>
          <button className="btn-comprar" onClick={finalizarPedido}><FaBolt /> Finalizar Pedido</button>
        </aside>
      )}
    </div>
  );
}
