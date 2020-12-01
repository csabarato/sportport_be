const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')


router.get('/auth_user', auth, async (req, res) => {

    res.status(200).send({msg: req.userPayload})
})

module.exports = router;
