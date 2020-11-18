const mongoose = require('mongoose')

const groundSchema = new mongoose.Schema({

    locationLatitude : {
        type: Number,
    },

    sportTypes: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'SportType'
    },

    locationLongitude : {
        type: Number
    },

    coverage : {
        type: String
    },

    isPaid : {
        type: Boolean
    },
    costPerHour: {
      type: Number
    }
})

const Ground =  mongoose.model('Ground', groundSchema)
module.exports = Ground;
