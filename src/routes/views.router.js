const { Router } = require("express")
const router = Router()
const  productManager = require("../dao/producManagerMDB")

router.get('/' , async(req,res) =>{
    try {
        const Productos = await productManager.readProducts()
        res.render("home", { Productos })
    } catch (error) {
        res.status(404).json({message: "Error al obtener los productos"})
    }

})

router.get('/chat', (req, res) => {
    res.render("chat", {})
})

module.exports = router;