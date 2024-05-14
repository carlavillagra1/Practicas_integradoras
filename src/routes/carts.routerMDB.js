const express = require("express");
const cartManager = require("../dao/cartsManagerMDB.js")

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const result = await cartManager.readCarts()
        res.send({ result: "success", payload: result })
    } catch (error) {
        res.status(404).json({message: "No se encontraron los carritos"})

    }
})
router.get('/cid', async(req,res) =>{
    try {
        let { cid } = req.params
        const result = await cartManager.cartById(cid)
        res.send({result: "success", playload: result })
    } catch (error) {
        res.status(404).json({message: "No se encontro el carrito"})
    }
})

router.post('/', async (req, res) => {
    try {
        let {cid, products} = req.body
        const result = await cartManager.createCart({cid, products})
        res.send({ result: "success", playload: result })
    } catch (error) {
        res.status(404).json({message: "No se aregego el carrito"})

    }
})
router.put('/', async(req,res) =>{
    try {
        
    } catch (error) {
        
    }
})
router.delete('/cid', async(req,res) =>{
    try {
        let { cid } = req.params
        const result = await cartManager.deleteCart(cid)
        res.send({ result: "success", playload: result })
    } catch (error) {
        
    }
})
module.exports = router