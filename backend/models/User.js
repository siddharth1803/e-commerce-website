const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: String,
        default: "user"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

})

UserSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("User", UserSchema)