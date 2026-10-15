require('dotenv').config();
require('./src/configs/db.config');

const express = require("express");
const app = express();

const UserRoutes = require("./src/routes/user.route");
const ConversationRoutes = require("./src/routes/conversation.route");
const MessageRoutes = require("./src/routes/message.route");

app.use("/api/yap/users", UserRoutes);

app.use("/api/yap/conversations" , ConversationRoutes);

app.use("/api/yap/message" , MessageRoutes);

app.listen(5000 , () => {
    console.log("app is running on http://localhost:5000");
});

