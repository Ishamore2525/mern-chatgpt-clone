const chatModel = require("../models/chat.model");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


//it will provide you to get response from GoogleGenerativeAI , ask question and reply from gemini-2.5-flash
//and store the chat in database
async function sendMessage(req, res){

    try {
        const { message } = req.body;


        const model = genAI.getGenerativeModel({model: "gemini-2.5-flash",});

        const result = await model.generateContent(message);

        const reply = "Mock Gemini response for development.";

        const chat = await chatModel.create({

                userId: req.user.id,

                title: message,

                messages: [
                    {
                        role: "user",
                        content: message,
                    },
                    {
                        role: "assistant",
                        content: reply,
                    },
                ],
        });

        return res.status(200).json({
            message: "Chat stored in database with reply",
            chat: {
                _id: chat._id,
                userId : chat.userId,
                title: chat.title,
                messages: chat.messages
            },
            reply
        });
    } 
    catch (error) {
        res.status(500).json({
        message: error.message,
        });
  }
}


//get all chats from database
async function getChats(req, res){

    try {
            const chats = await chatModel.find({userId: req.user.id,})
            .select("title createdAt")
            .sort({ updatedAt: -1 });

            return res.status(200).json({
                message: "All chats get successfully",
                chats
            });
    } 
    catch (error) {
            return res.status(500).json({
                message: error.message
            });
  }
}

//get single chat from database based user login (token) chat id 
async function getSingleChatById(req, res){

    try{

        const chat = await chatModel.findOne({
            _id : req.params.id,
            userId: req.user.id
        })

        if(!chat){

            return res.status(200).json({
                message: "Chat not found"
            })
        }

        return  res.status(200).json(chat);
    }
    catch(error){
        return res.status(500).json({
            message: error.message,
        })
    }

}

//delete single chat from database based on user login(token) chat id
async function deleteSingleChatById(req, res){

    try {

        const chat = await chatModel.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });

        if(!chat) {
            return res.status(404).json({
                    message: "Chat not found",
            });
        }

        return res.status(200).json({
            message: "Chat deleted successfully",
    });

    } 
    catch (error) {

        return res.status(500).json({
            message: error.message,
        });

    }

}


async function continueChat(req, res){

    try{

       
        const {message} = req.body;


        if (!message?.trim()) {
            
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        // Find chat and ensure it belongs to logged-in user
        const chat = await chatModel.findOne({
            _id: req.params.id,
            userId : req.user.id,
        })


        


        // Convert old messages to Gemini history format
        const history = chat.messages.map(msg => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{text: msg.content}],
        }))

        const model = genAI.getGenerativeModel({model: "gemini-2.5-flash",});

        const chatSession = model.startChat({history,});

        // Send new message
        // const result = await chatSession.sendMessage(message);
        const reply = "Mock Gemini response for development.";


        if (chat.messages.length === 0) {
            chat.title = message.slice(0, 30);
        }
        console.log(chat.title);

         // Save user message
        chat.messages.push({
            role: "user",
            content: message,
        });

        // Save AI reply
        chat.messages.push({
            role: "assistant",
            content: reply,
        });

        await chat.save();

        return res.status(200).json({
                success: true,
                message:"Message set successfully",
                reply,
                chat,
        });


    }
    catch(error){

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function emptyChat(req, res){

    try{

            const chat = await chatModel.create({

                userId: req.user._id,
                title: "New Chat",
                messages: []
            });

            return res.status(200).json(chat);

    }
    catch(error){
        return res.status(500).json({
            message: error.messsage
        })
    }
}




module.exports = {sendMessage, getChats, getSingleChatById, deleteSingleChatById, continueChat, emptyChat}