const express = require("express");
const mongoose  = require("mongoose");
const handlebars = require( "express-handlebars")
const usersRouterMDB = require("./routes/users.routerMDB.js")
const productRouterMDB = require("./routes/product.routerMDB.js")
const messageRouterMDB = require("./routes/message.routerMDB.js")
const cartsRouterMDB = require("./routes/carts.routerMDB.js")
const viewRouter = require("./routes/views.router.js")
const Server = require('socket.io');
const dotenv = require ('dotenv')
dotenv.config()
console.log(process.env.MONGO_URL)
const app = express()
const port = 8080

const httpServer = app.listen(port, console.log(`Server running on port ${port}`))
const socketServer = Server (httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine','handlebars')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use('/api/user', usersRouterMDB)
app.use('/api/product', productRouterMDB)
app.use('/api/message', messageRouterMDB)
app.use('/api/carts', cartsRouterMDB)
app.use('/api/views', viewRouter)

mongoose.connect(process.env.MONGO_URL)
.then(() => { console.log("Conectado a la base de datos") })
.catch(error => console.error("Error en la conexion", error))


socketServer.on('connection', socket =>{
    console.log(" Nuevo cliente conectado")
})