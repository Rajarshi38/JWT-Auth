const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
//connect to database
dotenv.config();
//import router
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");

mongoose.connect(process.env.DB_CONNECT_URI, { useNewUrlParser: true }, () =>
    console.log("connected to db")
);
//Middleware
app.use(express.json());

//route middleware
app.use("/api/user", authRouter);
app.use("/api/posts", postRouter);

app.listen(3000, () => console.log("server is running on port 3000"));
