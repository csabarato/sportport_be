const mongoose = require('mongoose')


const activitySchema = mongoose.Schema({

        owner : {
            type: mongoose.Schema.Types.ObjectID,
            required: true,
            ref: 'User'
        },

        signedUpUsers: [{
            type: mongoose.Schema.Types.ObjectID,
            ref: 'User'
        }],

        sportType : {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'SportType'
        },

        locationLatitude : {
            type: Number,
        },

        locationLongitude : {
            type: Number
        },

        numOfPersons: {
            type: Number
        },

        pitch: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Ground'
        }
})

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
