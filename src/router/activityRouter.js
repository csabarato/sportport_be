const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Activity = require('../model/activity')
const SportType = require('../model/sportType')

router.post('/activity' ,auth , async (req, res) => {

    try {
        const sportType = await SportType.findOne({name : req.body.sportType});
        if (!sportType) {
            throw new Error("Sport type not found");
        }

        const activity = new Activity({
            owner: req.userPayload.sub,
            sportType: sportType._id,
            locationLatitude: req.body.locationLat,
            locationLongitude: req.body.locationLon,
            startDate: req.body.startDate,
            numOfPersons: req.body.numOfPersons,
            description: req.body.description
        });

        await activity.save();
        res.status(201).send({msg: 'Activtiy saved'});

    } catch (e) {
        res.status(500).send({error: e.message});
    }
})

router.get('/activities', auth, async (req, res) => {

    try{
        const activities = await Activity.find()
            .populate({
                path: 'sportType',
                model: SportType,
                select: 'name'
            }).exec();

        res.status(200).send(activities);
    } catch (e) {
        res.status(500).send({error: e.message});
    }
});

module.exports = router;
