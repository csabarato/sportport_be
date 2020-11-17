const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()


app.use(bodyParser.json())

const port = process.env.PORT
app.listen(port, (error) => {
    if (error) {
        throw error;
    }
    console.log('App listen on port', port)
})

process.on('SIGINT', () => { console.log("App shuts down"); process.exit(); });

