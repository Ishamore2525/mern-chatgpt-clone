
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");


const tokenBlacklistModel = require("../models/blacklist.model");


//signup
async function userSignupController(req, res){

    const {username, email, password} = req.body

    const isExists = await userModel.findOne({
        email: email
    })

    if(isExists){
        
        return res.status(422).json({
            message: "Email is already exist",
            success: "Failed"
        })
    }

    const user = await userModel.create({

        username, email, password
    })

    const token = jwt.sign(  //https://jwtsecrets.com/ generate key for signing the token
        
            {userId: user._id}, 
            process.env.JWT_SECRET_TOKEN,
            {expiresIn: "3days"}
        ) 
    
    res.cookie("token", token)

    return res.status(201).json({
        user: {
            _id : user._id,
            email: user.email,
            username: user.username
        },
        token
    })
}

//login

async function userLoginController(req, res){

    const {email, password} = req.body

    const user = await userModel.findOne({
        email
    }).select("+password")

    if(!user){
        return res.status(401).json({
            message: "Email and password is invalid, user not exist"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if(! isValidPassword){
        return res.status(401).json({
            message: "Password is incorrect"
        })
    }

     const token = jwt.sign(  //https://jwtsecrets.com/ generate key for signing the token
        
            {userId: user._id}, 
            process.env.JWT_SECRET_TOKEN,
            {expiresIn: "3days"}
        ) 
    
        res.cookie("token", token) //finally set the token in cookie and send it to client for next time of login server check the token
    
        return res.status(200).json({
            user: {
                _id : user._id,
                email: user.email,
                username: user.username,
                password: user.password
            },
            token
        })

}

//logout

async function userLogoutController(req, res){

    const {email} = req.body;


    const user = await userModel.findOne({
        email
    }).select("+password")


    if(!user){
        return res.status(200).json({
            message: "Email is invalid or not exist"
        })
    }

    const token = req.cookies.token || req.headers.authorization ?.split("")[1]

    if(! token)
    {
        return res.status(400).json({
            message: "User logged out succcessfully.."
        })
    }

    res.cookie("token", "")
    

    await tokenBlacklistModel.create({
        token: token,
        user: user._id
    })

    res.status(200).json({
        message: "User logged out successfully",
         user: {
                _id : user._id,
                email: user.email,
                username: user.username,
                password: user.password
            }
    })
}



module.exports = {userSignupController, userLoginController, userLogoutController}