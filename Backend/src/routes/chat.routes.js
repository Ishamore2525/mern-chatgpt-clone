const express = require("express");
const SendMessage = require("../controllers/chat.controller.js");
const authmiddleware = require("../middlewares/auth.middleware.js")


const router = express.Router();

//save send messages
router.post("/", authmiddleware.authMiddleware, SendMessage.sendMessage);

//get all send messages in database
router.get("/", authmiddleware.authMiddleware, SendMessage.getChats);

//get single chat by id of chat. only this chat show current login user by token 
router.get("/:id", authmiddleware.authMiddleware, SendMessage.getSingleChatById);

//delete chat by chat id
router.delete("/:id", authmiddleware.authMiddleware, SendMessage.deleteSingleChatById);

//add message in existing chat
router.post("/:id/message", authmiddleware.authMiddleware, SendMessage.continueChat);

//create empty chat for new chat button user when click on new chat the empty chat is created then user ask question
router.post("/emptychat",authmiddleware.authMiddleware, SendMessage.emptyChat);


module.exports =  router;