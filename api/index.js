const auth = require("./auth");
const reservationapi = require("./model/reservation");
const availabilityapi = require("./model/availability");

const db = require('./database');
const express = require('express');

const app = express();
// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

auth.oauthredirect(app);
reservationapi.routes(app, db)
availabilityapi.routes(app, db)


app.listen(8081, () => {
    console.log("Listening...")
})