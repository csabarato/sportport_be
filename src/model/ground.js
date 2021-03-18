const mongoose = require('mongoose')

const groundSchema = new mongoose.Schema({

    reporter : {
        type: String,
        required: true,
        ref: 'User',
    },
    sportTypes: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'SportType'
    }],

    locationLatitude : {
        type: Number,
    },

    locationLongitude : {
        type: Number
    },

    coverage : {
        type: String
    },

    costFree : {
        type: Boolean
    },
    costPerHour: {
      type: Number
    },
    description : {
        type: String
    }
})

const Ground =  mongoose.model('Ground', groundSchema)
module.exports = Ground;
