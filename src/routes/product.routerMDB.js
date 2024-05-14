const express = require("express");
const productManager = require("../dao/producManagerMDB.js")


const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const products = await productManager.readProducts()
        res.send({ result: "success", playload: products })
    } catch (error) {
        res.status(404).json({ message: "No se encontraron los productos" })
    }
})
router.get('/id', async (req, res) => {
    try {
        const product = await productManager.getProductById(id)
        res.send({ result: "success", playload: product })
    } catch (error) {
        res.status(404).json({ message: "No se encontro el producto" })
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }
        const result = await productManager.createProduct(title, description, price, thumbnail, code, stock);
        res.send({ result: "success", payload: result });

    } catch (error) {
        res.status(500).json({ message: "No se pudo agregar el producto" });
    }
});
router.put('/id', async (req, res) => {
    try {
        let { id } = req.params
        const result = await productManager.updateProduct(id)
        res.send({ result: "success", playload: result })

    } catch (error) {
        res.status(404).json({ message: "No se pudo modificar el producto" })
    }
})
router.delete('/id', async (req, res) => {
    try {
        let { id } = req.params
        const result = await productManager.deleteProduct(id)
        res.send({ result: "success", playload: result })
    } catch (error) {
        res.status(404).json({ message: "No se borro el producto" })
    }
})
module.exports = router