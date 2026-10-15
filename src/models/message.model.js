const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    reactions: [
      {
        userId: { type: mongoose.Schema.ObjectId, required: true },
        emoji: { type: String, required: true },
      },
    ],
    editedAt: { type: Date },
    readBy: [mongoose.Schema.ObjectId],
    conversationId: { type: mongoose.Schema.ObjectId, ref: "Conversation" , required:true },
    senderId: { type: mongoose.Schema.ObjectId , required:true},
    type: { type: String, enum: ["text", "audio"] , default:"text"},
    content: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Message", MessageSchema);
