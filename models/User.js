const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
});

// userSchema.virtual("rePassword")
//     .set(function(value) {
//         if(value !== this.password) {
//                 throw new Error("Passwords don't match");
//         }
//     });

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 12)
})    

const User = mongoose.model("User", userSchema);

module.exports = User;