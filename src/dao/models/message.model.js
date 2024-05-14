const mongoose  = require("mongoose")

const messagesColletion = "Messages"

const messagesSchema = new mongoose.Schema({
    user: { type: String  },
    message: { type: String}
})

const messagesModel = mongoose.model(messagesColletion, messagesSchema)

module.exports = messagesModel