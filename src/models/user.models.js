const mongoose  = require("mongoose")

const userColletion = "Usuarios"

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true, max: 100 },
    apellido: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 50 }
})

const userModel = mongoose.model(userColletion, userSchema)

module.exports = userModel