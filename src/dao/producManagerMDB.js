const productModel = require("./models/product.model.js")

class productManagerMongo {

    async createProduct(title, description, price, thumbnail, code, stock) {
        try {
            const create = await productModel.create({ title, description, price, thumbnail, code, stock })
            return create

        } catch (error) {
            throw new Error("Error al crear el producto")
        }
    }

    async readProducts() {
        try {
            const products = await productModel.find()
            return products
        } catch (error) {
            throw new Error("Error al leer los productos")

        }
    }

    async getProductById(id) {
        try {
            const productFound = await productModel.findById(id)
            if (productFound) {
                return productFound
            }
        } catch (error) {
            throw new Error("Error al encontrar el producto")

        }
    }
    async updateProduct(id) {
        try {
            const productUpdate = await productModel.updateOne(id)
            return productUpdate
        } catch (error) {
            throw new Error("Error al modificar el producto")

        }
    }
    async deleteProduct(id) {
        try {
            const productDelete = await productModel.deleteOne(id)
            return productDelete
        } catch (error) {
            throw new Error("Error al eliminar el producto")
        }
    }
}

module.exports = productManagerMongo