const User = require("../models/User");
const bcrypt = require("bcrypt");
const {SECRET} = require("../config");
const jwt = require("../lib/jsonwentoken")

exports.register =async (userData) => {
    if(userData.password !== userData.rePassword) {
        throw new Error("Passwords mismatch")
    }
    
    const user = await User.findOne({email: userData.email});

    if(user) {
        throw new Error("Email already exists");
    }

   const createdUser = await User.create(userData);

   const token = generateToken(createdUser);

   return token;
} 
 
exports.login = async ({email, password}) => {
    const user = await User.findOne({email});
    if(!user) {
       throw new Error("Invalid email or password");
    }


    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid) {
        throw new Error("Invalid email or password");
    }
    const token = generateToken(user);

    return token;

}

async function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    }

    const token = await jwt.sign(payload, SECRET, {expiresIn: "2h"});
    return token
}