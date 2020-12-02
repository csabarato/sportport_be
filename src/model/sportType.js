const mongoose = require('mongoose')

const sportTypeSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true
    }
}, {collection: 'sport-types'})

const SportType = mongoose.model('SportType', sportTypeSchema);
module.exports = SportType;
