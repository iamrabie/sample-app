require('dotenv').config();
require('./src/configs/db.config');

const express = require("express");
const app = express();
const { createServer } = require("node:http");
const { join } = require("node:path");


const UserRoutes = require("./src/routes/user.route");
const ConversationRoutes = require("./src/routes/conversation.route");
const MessageRoutes = require("./src/routes/message.route");

const server = createServer(app);
//using io socket because http only understands normal http request-response, it has no idea how to manage live connections, events rooms etc.
const io = new Server(server ,  {
  connectionStateRecovery: {}
});


app.get('/' , (req , res , next) => {
//    res.send("<h1>hellow world!!</h1>");
     res.sendFile(join(__dirname,'index.html'));
});


app.use("/api/yap/users", UserRoutes);

app.use("/api/yap/conversations" , ConversationRoutes);

app.use("/api/yap/message" , MessageRoutes);


server.listen(5000 , () => {
    console.log("app is running on http://localhost:5000");
});

