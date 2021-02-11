
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.OAUTH2_CLIENT);

const admin = require('firebase-admin')

const auth = async (req, res, next) => {

    if(!req.header('Authorization')) {
        return res.status(442).send({error: 'missing Authorization header'})
    }

    const token = req.header('Authorization').replace('Bearer ','')

    const authType = req.header('Auth-Type')

    if (authType === 'GOOGLE_AUTH') {

        try {
            req.userPayload = await verifyGoogleIdToken(token);
            next();
        }  catch (e) {
            return res.status(401).send({error: e.message})
        }

    } else if (authType === 'FIREBASE_AUTH') {

        try {
            req.userPayload = await verifyFirebaseIdToken(token)
            next();
        } catch (e) {
            return res.status(401).send({error: e.message});
        }
    } else {
        return res.status(400).send({error: 'Invalid header: Auth-Type'});
    }
}

const verifyGoogleIdToken = async (token) => {

    const ticket = await client.verifyIdToken({
       idToken: token,
       audience: process.env.GOOGLE_AUDIENCE
    })
    return  ticket.getPayload()
}

const verifyFirebaseIdToken = async (token) => {
        return await admin.auth().verifyIdToken(token);
}

module.exports = auth
