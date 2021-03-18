const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const admin = require('firebase-admin')

require('./db/mongooseConfig')

const userRouter = require('./router/userRouter')
const activityRouter = require('./router/activityRouter')
const groundRouter = require('./router/groundRouter')

const app = express()


app.use(bodyParser.json())
app.use(userRouter)
app.use(activityRouter)
app.use(groundRouter)

const port = process.env.PORT

let serviceAccount = require(process.env.FBASE_ANDMINSDK_JSON_LOCATION);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

app.listen(port, (error) => {
    if (error) {
        throw error;
    }
    console.log('App listen on port', port)
})

process.on('SIGINT', () => { console.log("App shuts down"); process.exit(); });

