const mongoose = require('mongoose')


const activitySchema = mongoose.Schema({

        owner : {
            type: String,
            required: true,
            ref: 'User',
            description: 'GoogleSignIn Account Id'
        },

        signedUpUsers: [{
            type: String,
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

        startDate : {
            type: Number
        },

        numOfPersons: {
            type: Number
        },

        description: {
            type: String
        },

        ground: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Ground'
        }
})

activitySchema.methods.toJSON = function () {

    const activityObject = this.toObject();
    delete activityObject.__v;

    return activityObject;
}

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
