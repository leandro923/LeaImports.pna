const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Tu credencial de prueba
mercadopago.configure({
  access_token: 'TEST-3749891340043600-101213-dbeefb0c7c0b2054ee005abc50e87a87-744050659'
});

// Ruta para crear la preferencia
app.post('/crear-preferencia', async (req, res) => {
  try {
    const { description, price } = req.body;

    const preference = {
      items: [
        {
          title: description,
          unit_price: parseFloat(price),
          quantity: 1
        }
      ],
      back_urls: {
        success: 'http://localhost:3300/success.html',
        failure: 'http://localhost:3300/failure.html'
      },
      auto_return: 'approved'
    };

    const result = await mercadopago.preferences.create(preference);
    res.json({ preferenceId: result.body.id });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.status(500).json({ error: 'Algo falló' });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
