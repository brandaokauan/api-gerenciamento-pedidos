const pedidosService = require("../services/pedidosService");

function criarPedido(req, res) {
    try {
        const dados = req.body;

        const novoPedido = pedidosService.criarPedido(dados);

        return res.status(201).json(novoPedido);

    } catch (erro) {
        const mensagensValidacao = [
            "O nome do cliente é obrigatório.",
            "O valor deve ser um número maior que zero.",
            "Tipo inválido. Use entrega ou retirada.",
            "Prioridade inválida. Use baixa, normal ou alta."
        ];

        if (mensagensValidacao.includes(erro.message)) {
            return res.status(400).json({
                erro: erro.message
            });
        }

        console.error(erro);

        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}

function listarPedidos(req, res) {
    try {
        const pedidos = pedidosService.listarPedidos();

        return res.status(200).json(pedidos);
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}

function buscarPedidoPorId(req, res) {
    try {
        const pedido = pedidosService.buscarPedidoPorId(req.params.id);

        if (!pedido) {
            return res.status(404).json({
                erro: "Pedido não encontrado."
            });
        }

        return res.status(200).json(pedido);
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}

function atualizarStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const pedido = pedidosService.atualizarStatus(id, status);

        return res.status(200).json(pedido);

    } catch (erro) {
        if (erro.message === "Pedido não encontrado.") {
            return res.status(404).json({
                erro: erro.message
            });
        }

        if (erro.message === "Status inválido.") {
            return res.status(400).json({
                erro: erro.message
            });
        }

        console.error(erro);

        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}


module.exports = {
    criarPedido,
    listarPedidos,
    buscarPedidoPorId,
    atualizarStatus
};

