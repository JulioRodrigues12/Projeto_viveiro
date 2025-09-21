import React from 'react';

import './index.css';

const ProductModal = ({ isOpen, product, onClose }) => {
    if (!isOpen || !product) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-btn" onClick={onClose}>&times;</span>
                {/* Verifica se a imagem existe antes de renderizar */}
                {product.imageUrl && (
                    <img className="modal-img" src={product.imageUrl} alt={product.nome} />
                )}
                <h2>{product.nome}</h2>
                <p>{product.descricao}</p>
                {/* Você pode adicionar mais detalhes do produto aqui, se quiser */}
                <p>Tipo: {product.tipo}</p>
                {product.preco && <p>Preço: R$ {product.preco.toFixed(2)}</p>}
            </div>
        </div>
    );
};

export  {ProductModal};