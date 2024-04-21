const fs = require('fs');

fs.access('products.json', fs.constants.F_OK, (err) => {
    if (err) {
        fs.writeFile('products.json', '[]', (err) => {
            if (err) throw err;
            console.log('Archivo products.json creado exitosamente.');
        });
    } else {
        console.log('El archivo products.json ya existe.');
    }
});

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.nextProductId = 1;
        this.loadProducts();
        console.log(this.products);
    }

    loadProducts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            console.log(data)
            try {
                this.products = JSON.parse(data);
                this.nextProductId = this.products.length ? Math.max(...this.products.map(product => product.id)) + 1 : 1;
            } catch (error) {
                console.error('Error al analizar el archivo JSON:', error);
                this.products = [];
                this.nextProductId = 1;
            }
        }
    }
    
    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    addProduct(product) {
        // Para validar campos obligatorios
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        // Para validar que no se repita el código
        if (this.products.some(p => p.code === product.code)) {
            console.error(`El código "${product.code}" ya existe.`);
            return;
        }

        // Para asignar un ID autoincrementable
        product.id = this.nextProductId++;
        this.products.push(product);
        this.saveProducts();
        console.log(this.products);
    }

    getProducts(limit) {
        return limit ? this.products.slice(0, limit) : this.products;
        console.log()
    }    

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error("Producto no encontrado.");
        }
        return product;
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            console.error('Producto no encontrado.');
            return;
        }
        this.products[index] = { ...this.products[index], ...updatedProduct };
        this.saveProducts();
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            console.error('Producto no encontrado.');
            return;
        }
        this.products.splice(index, 1);
        this.saveProducts();
    }
}

module.exports = ProductManager;

// Crea 10 nuevos productos
const product1 = new Product("iPhone 12", "Smartphone de Apple con pantalla OLED y cámara dual.", 799, "./img/iphone12.jpg", "iph121", 50);
const product2 = new Product("Samsung Galaxy Watch", "Reloj inteligente con seguimiento de actividad y notificaciones.", 249, "./img/sgw.jpg", "gal001", 30);
const product3 = new Product("Sony PlayStation 5", "Consola de videojuegos de última generación.", 499, "./img/pst5.jpg", "pst501", 20);
const product4 = new Product("Canon EOS Rebel T7i", "Cámara réflex digital con sensor APS-C y grabación de video Full HD.", 699, "./img/cn.jpg", "can800", 55);
const product5 = new Product("MacBook Pro", "Laptop Apple con procesador Intel Core i7 y pantalla Retina.", 1499, "./img/mcb.jpg", "mac006", 15);
const product6 = new Product("Samsung 65-inch 4K TV", "Televisor con resolución Ultra HD y tecnología QLED.", 899, "./img/samcurv.jpg", "ssc654", 10);
const product7 = new Product("Fitbit Charge 4", "Pulsera de actividad con monitor de ritmo cardíaco y GPS.", 149, "./img/fitbit.jpg", "fit235", 50);
const product8 = new Product("Amazon Echo Dot", "Altavoz inteligente con asistente virtual Alexa.", 39, "./img/aed.jpg", "aed123", 100);
const product9 = new Product("Nintendo Switch", "Consola de videojuegos híbrida para jugar en casa o en movimiento.", 299, "./img/nsw.jpg", "swi479", 40);
const product10 = new Product("Sony WH-1000XM4", "Audífonos inalámbricos con cancelación de ruido y alta calidad de sonido.", 349, "./img/aswh.jpg", "son011", 15);

const manager = new ProductManager('products.json');

if (manager.getProducts().length === 0) {
    // Llama a addProduct
    manager.addProduct(product1);
    manager.addProduct(product2);
    manager.addProduct(product3);
    manager.addProduct(product4);
    manager.addProduct(product5);
    manager.addProduct(product6);
    manager.addProduct(product7);
    manager.addProduct(product8);
    manager.addProduct(product9);
    manager.addProduct(product10);
}