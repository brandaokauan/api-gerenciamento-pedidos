const express = require("express");
const pedidosRoutes = require("./routes/pedidosRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "API de Gerenciamento de Pedidos funcionando!"
    });
});

app.use("/pedidos", pedidosRoutes);

module.exports = app;
