const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 2,
        maxLength: 30,
    },
    lastName: {
        type: String
    },
    age: {
        type: Number,
        min: 18,
        max: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("enter the correct email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter the strong password");
            }
        }
    },
    about: {
        type: String,
        default: "I am a Software Engineer",
    },
    skills: {
        type: [String],
    },
    photoUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1BM98aZ18HKEbruHfdxX2GxAaw5MWkSbnvw&s"
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("please select the proper gender");
            }
        },
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('user', userSchema);