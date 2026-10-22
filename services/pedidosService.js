const pedidos = [];
let proximoId = 1;

function criarPedido(dados) {
    const { cliente, tipo, valor, prioridade } = dados;

    if (typeof cliente !== "string" || cliente.trim() === "") {
        throw new Error("O nome do cliente é obrigatório.");
    }

    if (typeof valor !== "number" || !Number.isFinite(valor) || valor <= 0) {
        throw new Error("O valor deve ser um número maior que zero.");
    }

    const tiposPermitidos = ["entrega", "retirada"];
    const prioridadesPermitidas = ["baixa", "normal", "alta"];

    if (!tiposPermitidos.includes(tipo)) {
        throw new Error("Tipo inválido. Use entrega ou retirada.");
    }

    if (!prioridadesPermitidas.includes(prioridade)) {
        throw new Error("Prioridade inválida. Use baixa, normal ou alta.");
    }

    const novoPedido = {
        id: proximoId++,
        cliente: cliente.trim(),
        tipo,
        valor,
        prioridade,
        status: "recebido"
    };

    pedidos.push(novoPedido);

    return novoPedido;
}

function listarPedidos() {
    return pedidos;
}

function buscarPedidoPorId(id) {
    return pedidos.find(pedido => pedido.id === Number(id));
}

function atualizarStatus(id, novoStatus) {
  const pedido = buscarPedidoPorId(id);

  if (!pedido) {
    throw new Error("Pedido não encontrado.");
  }

  const transicoesPermitidas = {
    "recebido": ["em preparo", "cancelado"],
    "em preparo": ["pronto", "cancelado"],
    "pronto": ["entregue", "cancelado"],
    "entregue": [],
    "cancelado": []
  };

  const statusPermitidos = Object.keys(transicoesPermitidas);

  if (!statusPermitidos.includes(novoStatus)) {
    throw new Error("Status inválido.");
  }

  const statusAtual = pedido.status;

  if (!transicoesPermitidas[statusAtual].includes(novoStatus)) {
    throw new Error("Transição de status inválida.");
  }

  pedido.status = novoStatus;

  return pedido;
}

module.exports = {
    criarPedido,
    listarPedidos,
    buscarPedidoPorId,
    atualizarStatus
};

