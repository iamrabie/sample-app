const mongoose = require("mongoose");



mongoose.connect(process.env.MONGODB_URI).
then(() => {
    console.log("db connected successfully");
}).
catch((err) => {
    console.log("ERROR OCCURED ::::::::::" , err.message);
});


