const mongoose = require("mongoose");


const AttachmentSchema = new mongoose.Schema({
    url:String,
    type: { type:String , enum:['image' , 'document' , 'video']}
});

const ConversationSchema = new mongoose.Schema({

    type:{ type:String , enum:['private' , 'group'] , default:'private' },
    members:[
        {
            userId:{ type:mongoose.Schema.ObjectId , required:true },
            isPinned:{type:Boolean , default:false  },
            isArchived:{type:Boolean , default:false },
            lastMessagePreview:{ type:mongoose.Schema.ObjectId },
            markAsUnread: { type:Boolean , default:false}
        }
    ],
    // messages:[mongoose.Schema.ObjectId],
    admins:[mongoose.Schema.ObjectId],
    attachments:[AttachmentSchema]


},
{
    timestamps:true
});

module.exports = mongoose.model("Conversation" , ConversationSchema);