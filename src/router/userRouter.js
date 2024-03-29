const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../model/user')

router.patch('/sync_user_data', auth, async (req, res) => {

    let user = await User.findOne({_id : req.userPayload.sub})

    if (!user) {
        saveUserData(req.body).then(user => {
            return res.status(200).send(user)
        }).catch(e => {
            return res.status(500).send(e.message)
        })
    }

    else {
        updateUserData(user, req.body).then(user => {
            return res.status(200).send(user)
        }).catch(e => {
            return res.status(500).send(e.message)
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
