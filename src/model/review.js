const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({

    reporter: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },
    rating : {
        type: Number
    },

    comment: {
        type: String
    },

    ground: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Ground'
    }
})

const Review =  mongoose.model('Review', reviewSchema)
module.exports = Review;
