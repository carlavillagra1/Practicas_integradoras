const express = require("express");
const messagesModel = require("../dao/models/message.model");

const router = express.Router()

router.get('/', async (req, res) => {
    try {

    } catch (error) {
        console.log(error)

    }
})

router.post('/', async (req, res) => {
    let { user, message } = req.body
    try {
        let result = await messagesModel.create({ user, message })
        res.send({ result: "success", playload: result })
    } catch (error) {

    }
})
module.exports = router