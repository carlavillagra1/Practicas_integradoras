const mongoose  = require("mongoose")

const productColletion = "Productos"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: Number },
    thumbnail: { type: Array, default: [] },
    code: { type: String, required: true, max: 50 },
    status: { type: Boolean , default: true},
    stock: { type: Number}
})

const productModel = mongoose.model(productColletion, productSchema)

module.exports = productModel