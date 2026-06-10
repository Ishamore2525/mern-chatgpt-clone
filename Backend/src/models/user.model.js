const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");



const userSchema = new mongoose.Schema({

    username: {
        type : String,
        required:[true, "Username is required"]
    },


    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Invalid Email Address."],
        unique: [true, "Email already exists."]

    },

    password: {
        type: String,
        required:[true, "PAssword is required"],
        minlength: [6, "password should conatin more than 6 character"],
        select: false
    },
},
    {
    timestamps: true,

})


userSchema.pre("save", async function(next){ // this is a middleware which will run before saving the user data to database

    if(!this.isModified("password")){

        return
    }

    const hash = await bcrypt.hash(this.password, 10) // this will hash the password with 10 rounds of salt
    this.password = hash

    return

})

userSchema.methods.comparePassword = async function (password){

    return await bcrypt.compare(password, this.password) // this will compare the plain text password with the hashed password and return true or false
    //check password is correct or not which is given by user
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel