const express = require("express");
const mongoose  = require("mongoose");
const usersRouter = require("./routes/users.router")
const dotenv = require ('dotenv')
dotenv.config()
console.log(process.env.MONGO_URL)
const app = express()
const port = 8080

app.use(express.urlencoded({extended:true}))
app.use(express.json())


mongoose.connect(process.env.MONGO_URL)
.then(() => { console.log("Conectado a la base de datos") })
.catch(error => console.error("Error en la conexion", error))

app.use('/api/user', usersRouter)


app.listen(port, console.log(`Server running on port`))