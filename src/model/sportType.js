const mongoose = require('mongoose')
const validator = require('validator')

const sportTypeSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true
    }

})

const SportType = mongoose.model('SportType', sportTypeSchema);
module.exports = SportType;
