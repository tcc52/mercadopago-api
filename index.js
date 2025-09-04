const express = require("express");
const mercadopago = require("mercadopago");

const app = express();
app.use(express.json());

// Configuração Mercado Pago (SDK nova)
const client = new mercadopago.MercadoPagoConfig({
  accessToken: "TEST-8779171755258072-090219-4198410b1d3dc7c1f45ee93c135a70cc-2627703883"
});

// Criar rota de teste
app.get("/", (req, res) => {
  res.send("API Mercado Pago funcionando ✅");
});

// Criar pagamento
app.post("/pagamento", async (req, res) => {
  try {
    const preference = new mercadopago.Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: "Produto Teste",
            quantity: 1,
            unit_price: 20.0,
            currency_id: "BRL"
          }
        ]
      }
    });

    res.json({ init_point: response.init_point });
  } catch (err) {
    console.error("Erro Mercado Pago:", err);
    res.status(500).send("Erro Mercado Pago: " + err.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
