require('dotenv').config();
require('./src/configs/db.config');

const express = require("express");
const app = express();
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const UserRoutes = require("./src/routes/user.route");
const ConversationRoutes = require("./src/routes/conversation.route");
const MessageRoutes = require("./src/routes/message.route");

const server = createServer(app);
//using io socket because http only understands normal http request-response, it has no idea how to manage live connections, events rooms etc.
const io = new Server(server);


app.get('/' , (req , res , next) => {
//    res.send("<h1>hellow world!!</h1>");
     res.sendFile(join(__dirname,'index.html'));
});


app.use("/api/yap/users", UserRoutes);

app.use("/api/yap/conversations" , ConversationRoutes);

app.use("/api/yap/message" , MessageRoutes);


// In short: one Node server, two handlers. Express handles normal requests, and io handles live connections. Both share the same server and the same port.
//fires everytime a client connects.
io.on('connection' , (socket) => {
    console.log("a user connected");

    //CATCH ALL LISTENERS
    //catches all incoming events
    socket.onAny((event , ...args) => {
      console.log("event name" , event);
      console.log("and its args::" , args);
    });

    //catches all outgoing events
    socket.onAnyOutgoing((event , ...args) => {
      console.log("event name" , event);
      console.log("and its args::" , args);
    });


    socket.on('request' , (p1 , p2 , callback) => {
        console.log("param 1 ::" , p1);
        //called once, if there are multiple only first one will be considered.
        //this is server acknowledging the callback then it sends the response to teh client.
        callback({
          status:'ok'
        });
        console.log("param 2 :" , p2);
    });


    //ACKNOWLEDGEMENT WITH PROMISE
    socket.on("promise" , (p1 , p2 , p3 , callback) => {
        console.log("all params" , p1 , p2 , p3);
        callback({
            message:"Acknowledged!",
            status:"success"
        });
    });

    // socket.emit('data' , 1 , "apple" , {age:27 , buffer:Buffer.from([6])} );
    
    //for all the clients
    // io.emit('hello' , 'whats up?');

    //for all the clients except the sender
    // socket.broadcast.emit("hello" , "lol");

    //on listens to the event
    socket.on("chat-message" , (message) => {
        // console.log("input message :::::::::::" , message);
        // socket.broadcast.emit('hello' , message);
        socket.broadcast.emit('texts' , message);
    });

    //triggers when a user disconnects.
    // socket.on('disconnect' , () => {
    //     console.log("user disconnected");
    // })
});

server.listen(5000 , () => {
    console.log("app is running on http://localhost:5000");
});

