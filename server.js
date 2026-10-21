require('dotenv').config();
require('./src/configs/db.config');

const express = require("express");
const app = express();
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const cors = require("cors");


const UserRoutes = require("./src/routes/user.route");
const ConversationRoutes = require("./src/routes/conversation.route");
const MessageRoutes = require("./src/routes/message.route");

const { handleSaveMessage } = require("./src/controllers/message.controller");

const server = createServer(app);
//using io socket because http only understands normal http request-response, it has no idea how to manage live connections, events rooms etc.
const io = new Server(server ,  {
  cors : {
    origin:"http://localhost:5173"
  },
  connectionStateRecovery: {}
});

app.use(cors({origin:"http://localhost:5173"}));
app.use(express.json());

app.get('/' , (req , res , next) => {
//    res.send("<h1>hellow world!!</h1>");
     res.sendFile(join(__dirname,'index.html'));
});


app.use("/api/yap/users", UserRoutes);

app.use("/api/yap/conversations" , ConversationRoutes);

app.use("/api/yap/message" , MessageRoutes);

io.on("connection" , (socket) => {
    // console.log("a user connected" , socket.id);

    socket.on("disconnect" , () => {
        console.log("user disconnected" ,  socket.id);
    });

    socket.on("on-send-message" , (message , senderId) => {
        console.log("ON SEND MESSAGE LISTENED" , message , senderId);
        handleSaveMessage(message , senderId);
    });
})


server.listen(5000 , () => {
    console.log("app is running on http://localhost:5000");
});

