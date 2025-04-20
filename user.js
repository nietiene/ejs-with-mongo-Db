const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    id:{type: Number, unique: true, required: true},
    name:{type: String,required: true},
    password:{type: String,required: true},

});

module.exports = mongoose.model("user", userSchema);