const express = require("express");
const mercadopago = require("mercadopago");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura chave do Mercado Pago (use token de TESTE primeiro!)
mercadopago.configure({
  access_token: "SUA_ACCESS_TOKEN_AQUI"
});

// Rota de teste (GET)
app.get("/", (req, res) => {
  res.send("API Mercado Pago funcionando ✅");
});

// Rota de pagamento (POST)
app.post("/pagamento", async (req, res) => {
  try {
    const total = parseFloat(req.body.total);

    let preference = {
      items: [
        {
          title: "Compra no Supermercado",
          quantity: 1,
          currency_id: "BRL",
          unit_price: total
        }
      ],
      back_urls: {
        success: "https://seusite.com/sucesso",
        failure: "https://seusite.com/falha",
        pending: "https://seusite.com/pendente"
      },
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);
    res.send(response.body.init_point);
  } catch (err) {
    res.status(500).send("Erro ao gerar pagamento: " + err.message);
  }
});

// Render usa porta dinâmica
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
