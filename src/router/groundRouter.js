const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')

const Ground = require('../model/ground')
const SportType = require('../model/sportType')
const User = require('../model/user')

router.post('/ground',auth, async (req,res) => {

    try {

        let sportTypeFilterRegexp = []
        req.body.sportTypes.forEach(opt => {
            sportTypeFilterRegexp.push(new RegExp(opt, "i"))
        })

        const sportTypes = await SportType.find({name : { $in : sportTypeFilterRegexp } })

        const ground = new Ground({
            reporter: req.userPayload.sub,
            sportTypes: sportTypes,
            locationLatitude: req.body.locationLat,
            locationLongitude: req.body.locationLon,

            coverage: req.body.coverage,
            costFree: req.body.costFree,
            costPerHour: req.body.costPerHour,
            description: req.body.description
        });

        await ground.save();
        res.status(201).send({msg: 'Ground saved'});

    } catch (e) {
        res.status(500).send({error: e.message});
    }

})

module.exports = router;
