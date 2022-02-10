const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
//connect to database
dotenv.config();

mongoose.connect(process.env.DB_CONNECT_URI, { newUrlParser: true }, () =>
    console.log("connected to db")
);
//import router
const authRouter = require("./routes/auth");

//route middleware
app.use("/api/users", authRouter);

app.listen(3000, () => console.log("server is running on port 3000"));
