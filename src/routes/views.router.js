const { Router } = require("express")
const router = Router()
const productManagerMongo = require("../dao/producManagerMDB.js");
const productManager = new productManagerMongo();

router.get('/' , async(req,res) =>{
    try {
        const productos = await productManager.readProducts()
        res.render("home", { productos })
    } catch (error) {
        res.status(404).json({message: "Error al obtener los productos"})
    }

})

router.get('/chat', (req, res) => {
    res.render('chat', { style:'index.css'})
})
router.get('/realTimeProducts', (req, res) => {
    res.render("realTimeProducts", {})
})


module.exports = router;