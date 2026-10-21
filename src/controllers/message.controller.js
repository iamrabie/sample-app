//MESSAGES MODEL
const message = require("../models/message.model");


const handleSaveMessage = (text , id) => {
    console.log("handle save message controller" ,  text);

    let saveMessage = new message({
    editedAt:new Date(),
    conversationId: { type: mongoose.Schema.ObjectId, ref: "Conversation" , required:true },
    senderId: id,
    content: text,
    });
}

module.exports = {handleSaveMessage}