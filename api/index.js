const db = require('./database');
const Reservation = db.Reservation
const sequelize = db.sequelize
const Availabilities = db.Availabilities

const moment = require("moment")
const express = require('express')
const app = express()

// Middleware
app.use(express.json())
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// setting api routes
app.get('/reservations', (req, res) => {
    Reservation.findAll().then(reservations => res.json(reservations));
})


app.get('/reservations/search', async (req, res) => {

    let query = {};

    if (req.query.email) {
        query.email = req.query.email
    }
    if (req.query.start) {
        query.start = {$gte: moment(req.query.start).toDate()}
    }
    if (req.query.end) {
        query.start = {$lte: moment(req.query.end).toDate()}
    }
    try {
        const results = await Reservation.findAll({
            where: query,
        });
        res.json(results);
    } catch (e) {
        res.status(500).json({error: e})
    }
})
app.get('/reservations/agg', async (req, res) => {

    let query = {};
    let group = [];

    if (req.query.email) {
        query.email = req.query.email
    }
    if (req.query.start) {
        query.start = {$gte: moment(req.query.start).toDate()}
    }
    if (req.query.end) {
        query.start = {$lte: moment(req.query.end).toDate()}
    }
    group = [req.query.group];
    try {
        const results = await Reservation.findAll({
            where: query,
            group: group,
            attributes: [[req.query.group, "value"], [sequelize.fn('COUNT', req.query.group), 'count']],
        });
        res.json(results);
    } catch (e) {
        res.status(500).json({error: e})
    }
})

app.post('/reservations', async function (req, res) {
    const reservation = req.body
    const date = moment(reservation.start).format('DD-MM-YYYY')
    console.log(reservation.availabilityId)
    try {
        const resa = await Reservation.create({
            email: reservation.email,
            start: reservation.start,
            end: reservation.end,
            title: reservation.title,
            date: date,
            availabilityId: reservation.availabilityId
        })
        res.json(resa);
    } catch (e) {
        console.log(e)
        res.status(500).send({message: e});
    }
});

app.get('/availabilities', (req, res) => {
    Availabilities.findAll({include: ["reservations"]}).then(availabilities => res.json(availabilities));
})

app.get('/availabilities/search', async (req, res) => {

    let query = {};

    if (req.query.email) {
        query.email = req.query.email
    }
    if (req.query.start) {
        query.start = {$gte: moment(req.query.start).toDate()}
    }
    if (req.query.end) {
        query.start = {$lte: moment(req.query.end).toDate()}
    }
    try {
        const results = await Availabilities.findAll({
            where: query,
        });
        res.json(results);
    } catch (e) {
        res.status(500).json({error: e})
    }
})

app.post('/availabilities', async function (req, res) {
    const availability = req.body
    try {
        const av = await Availabilities.create({
            start: availability.start,
            end: availability.end,
        })
        res.json(av);
    } catch (e) {
        console.log(e)
        res.status(500).send({message: e});
    }
});


app.delete("/reservations/:id", function (req, res) {
    console.log(req.query)
    console.log(req.params)

    if (req.params.id) {
        console.log("Deleting Reservation: " + req.query.id);
        Reservation.destroy({
            where: {id: parseInt(req.params.id)}
        });
        res.status(200).send();
    } else {
        res.status(400).send("Please specify a id");
    }
});

app.listen(8081, () => {
    console.log("Listening...")
})