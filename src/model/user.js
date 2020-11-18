const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({

    email :{
        type: String,
        unique: true,
        required: true,
        lowercase: true,

        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },

    username : {
        type: String,
        required: false,
    },

    signedUpActivities: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Activity'
    }]


})

const User = mongoose.model('User', userSchema)
module.exports = User;
