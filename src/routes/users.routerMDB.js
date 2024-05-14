const express = require("express");
const { default: userModel } = require("../dao/models/user.models.js");

const router = express.Router()

router.get('/', async(req,res) =>{
    try {
        let  users = await userModel.find()
        res.send({ result: "success", playload: users })
    } catch (error) {
        console.log(error)
        
    }
})

router.post('/', async(req,res)=>{
    let {nombre, apellido, email} = req.body
    if(!nombre || !apellido || !email){
        res.send({status: "error", error: "faltan parametros"})
    }
    let result = await userModel.create({nombre, apellido , email})
    res.send({result: "success", playload: result})
})
module.exports = router