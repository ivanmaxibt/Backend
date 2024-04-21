const express = require('express');
const app = express();
app.use(express.json());

const ProductManager = require('./ProductManager');
const productManager = new ProductManager();

app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi tienda de productos!');
});

app.get('/products', (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

// Endpoint para obtener todos los productos (con límite opcional)
app.get('/products', (req, res) => {
  try {
    const limit = req.query.limit || null;
    const products = productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', (req, res) => {
  try {
    const productId = req.params.pid;
    const product = productManager.getProductById(productId);
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// Iniciar el servidor en el puerto 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});