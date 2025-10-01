import React, { createContext, useState } from "react";

export const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [pedido, setPedido] = useState({ itens: [], total: 0 });

  const atualizarPedido = (novoPedido) => {
    setPedido(novoPedido);
    localStorage.setItem("carrinhoDeCompras", "");
  };

  return (
    <PedidoContext.Provider value={{ pedido, atualizarPedido }}>
      {children}
    </PedidoContext.Provider>
  );
};
