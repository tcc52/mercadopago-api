const express = require("express");
const mercadopago = require("mercadopago");

const app = express();
app.use(express.json());

// Configuração Mercado Pago (SDK nova)
const client = new mercadopago.MercadoPagoConfig({
  accessToken: "APP_USR-8779171755258072-090219-febcca77b59552a9bb2a986f2193361b-2627703883"
});

// Criar rota de teste
app.get("/", (req, res) => {
  res.send("API Mercado Pago funcionando ✅");
});

// Criar pagamento
app.post("/pagamento", async (req, res) => {
  try {
    const { title, quantity, unit_price } = req.body;
    
    const preference = new mercadopago.Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: title,
            quantity: Number(quantity),
            unit_price: Number(unit_price),
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
