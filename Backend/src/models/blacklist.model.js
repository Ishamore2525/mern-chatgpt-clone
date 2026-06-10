const mongoose = require("mongoose");

// delete token if you want to delete user account or we can say logout (blacklisting)
const tokenBlacklistSchema = new mongoose.Schema({

    token:{
        type:String,
        required: [true, "Token is required to blacklist"],
        unique: [true, "Token is aleady blacklist"]
    },
    user:{
        type:String
    }
    
}, {
    timestamps: true
})

tokenBlacklistSchema.index({createdAt : 1} , {
    expireAfterSeconds: 60 * 60 * 24 *3 // 3 days token rahnar mg delete honar
})

const tokenBlacklistModel = mongoose.model("tokenBlacklist", tokenBlacklistSchema);

module.exports = tokenBlacklistModel;