const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser") // set token in cookie
const chatRouter = require("./routes/chat.routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:  "https://my-chat-app.vercel.app",
    credentials: true,
}));
//authenticate user
app.use("/api/auth", authRouter);
//sendmessge
app.use("/api/sendmessage", chatRouter);


module.exports = app;