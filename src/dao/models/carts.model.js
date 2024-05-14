const mongoose  = require("mongoose")

const cartColletion = "Carrito"

const cartSchema = new mongoose.Schema({
    products: { type: String }
})

const cartModel = mongoose.model(cartColletion, cartSchema)

module.exports = cartModel