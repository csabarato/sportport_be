const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../model/user')

router.patch('/sync_user_data', auth, async (req, res) => {

    let user = await User.findOne({_id : req.body._id})

    if (!user) {
        saveUserData(req.body).then(user => {
            return res.status(200).send(user)
        }).catch(e => {
            return res.status(500).send(e)
        })
    }

    else {
        updateUserData(user, req.body).then(user => {
            return res.status(200).send(user)
        }).catch(e => {
            return res.status(500).send(e)
        });
    }
})

const saveUserData = async (body) => {
    let newUser = new User({
        _id : body._id,
        email : body.email,
        firstName : body.firstName,
        lastName : body.lastName,
        username : body.username
    });
    return newUser.save()
}

const updateUserData = async (user, body) => {

    const updateFields = Object.keys(body);

    updateFields.forEach(field => user[field] = body[field])
    return user.save();
}

module.exports = router;
