const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Activity = require('../model/activity')
const SportType = require('../model/sportType')

router.post('/activity' ,auth , async (req, res) => {

    const sportType = await SportType.findOne({name : req.body.sportType});

    if (!sportType) {
        res.status(401).send({msg: "Sport type not exists"});
        return;
    }

    const activity = new Activity({
        owner: req.userPayload.sub,
        sportType: sportType._id,
        locationLatitude: req.body.locationLat,
        locationLongitude: req.body.locationLon,
        numOfPersons: req.body.numOfPersons,
        description: req.body.description
    });

    await activity.save();
    res.status(201).send({msg: 'Activtiy saved'});
})

module.exports = router;
