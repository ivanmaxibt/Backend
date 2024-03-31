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
    constructor() {
        this.products = [];
        this.nextProductId = 1;
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
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error("Producto no encontrado.");
        }
        return product;
    }
}

// Ejemplo de uso
const manager = new ProductManager();

// Agregar producto
manager.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25));

// Obtener productos
console.log("\nLista de productos:");
console.log(manager.getProducts());

// Intentar agregar producto con código repetido
manager.addProduct(new Product("producto repetido", "Este es otro producto repetido", 150, "Otra imagen", "abc123", 10));

// Obtener producto por ID
const productId = 1;
const productById = manager.getProductById(productId);
if (productById) {
    console.log(`Producto con ID ${productId}: ${productById.title} - Precio: $${productById.price.toFixed(2)}`);
}