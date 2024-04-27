const express = require('express');
const app = express();
app.use(express.json());

const ProductManager = require('./ProductManager');
const productManager = new ProductManager();

// Rutas para productos
app.get('/api/products', (req, res) => {
    const products = productManager.getProducts(req.query.limit);
    res.json(products);
});

app.get('/api/products/:pid', (req, res) => {
    const product = productManager.getProductById(req.params.pid);
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
});

app.post('/api/products', (req, res) => {
    const product = req.body;
    productManager.addProduct(product);
    res.status(201).json(product);
});

app.put('/api/products/:pid', (req, res) => {
    const updatedProduct = req.body;
    productManager.updateProduct(req.params.pid, updatedProduct);
    res.json(updatedProduct);
});

app.delete('/api/products/:pid', (req, res) => {
    productManager.deleteProduct(req.params.pid);
    res.status(204).end();
});

// Rutas para carritos
app.get('/api/carts/:cid', (req, res) => {
    const cart = productManager.getCartById(req.params.cid);
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart);
});

app.post('/api/carts', (req, res) => {
    const newCart = productManager.addCart();
    res.status(201).json(newCart);
});

app.post('/api/carts/:cid/products/:pid', (req, res) => {
    productManager.addProductToCart(req.params.cid, req.params.pid, req.body.quantity);
    res.status(201).end();
});

// Iniciar el servidor en el puerto 8080
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});