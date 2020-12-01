
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.OAUTH2_CLIENT);

const auth = async (req, res, next) => {

    try {
        const ticket = await client.verifyIdToken({
            idToken: req.query.token,
            audience: process.env.GOOGLE_AUDIENCE
        })

        req.userPayload = ticket.getPayload()
        next()
    } catch (e) {
        res.status(401).send({error: e.message})
    }
}

module.exports = auth
