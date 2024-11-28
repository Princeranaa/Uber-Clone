const mongoose = require("mongoose");
const brypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config()

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength:[3, "First name must be at least 3 characters"]
        },
        lastname:{
            type: String,
            required: true,
            minlength:[3, "last name must be at least 3 characters"]
        }
    },

    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    socketId:{
        type: String,
    }

})

userSchema.methods.generateAtuToken  = function() {
   const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET,{ expiresIn: "24h" })
   return token
}

userSchema.methods.comparePassword = async function(password) {
    return await brypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password) {
    return await brypt.hash(password,10)
}

module.exports = mongoose.model("user", userSchema);



