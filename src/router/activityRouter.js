const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Activity = require('../model/activity')
const SportType = require('../model/sportType')
const User = require('../model/user')

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

    let filterObject = {}
    if (req.query.q) {
        filterObject = addQueryFilters(req.query.q, req.userPayload.sub);
    }
    try{
        const activities = await Activity.find(filterObject)
            .populate({
                path: 'sportType',
                model: SportType,
                select: 'name'
            })
            .populate({
                path: 'owner',
                model: User,
                select: 'email firstName lastName'
            })
            .exec();

        res.status(200).send(activities);
    } catch (e) {
        res.status(500).send({error: e.message});
    }
});

router.post('/activity/sign_up', auth, async (req, res) => {

    try {
        const activity = await Activity.findOne({_id : req.body.activity})
            .populate({
                path: 'sportType',
                model: SportType,
                select: 'name'
            }).populate({
                    path: 'owner',
                    model: User,
                    select: 'email firstName lastName'
            }).exec();

        if (!activity)  {
            return res.status(404).send({error: 'Activity not found with provided ID.'})
        }

        if (activity.owner === req.userPayload.sub) {
            return res.status(405).send({error: 'Signing up to own activity not allowed.'})
        }

        if (activity.signedUpUsers.includes(req.userPayload.sub)) {
            return res.status(202).send({msg: 'User already signed up.'})
        }

        activity.signedUpUsers.push(req.userPayload.sub)
        await activity.save();
        return res.status(200).send(activity);

    } catch (e) {
        return res.status(400).send({error: e.message})
    }
})

const addQueryFilters = function (queryParam, userId) {
    let filterObject = {}
    switch (queryParam) {
        case 'my' : {
            filterObject.owner = userId;
        }
            break;
        case 'signedUp' : {
            filterObject.signedUpUsers = {$in : [userId]};
        }
            break;
        case  'open' : {
            filterObject.$and = [ { remainingPlaces : {$gt : 0} },
                { owner : {$ne : userId}},
                { signedUpUsers: {$nin : [userId] }}
            ]
        }
    }
    return filterObject;
}

module.exports = router;
