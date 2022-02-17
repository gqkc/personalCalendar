const moment = require("moment");

const routes = (app, db) => {
    const Availabilities = db.Availabilities;

    /**
     * Get all availabilities with their reservations
     */
    app.get('/availabilities', (req, res) => {
        Availabilities.findAll({include: ["reservations"]}).then(availabilities => res.json(availabilities));
    })

    /**
     * search for availabilities
     */
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

    /**
     * add new availability
     */
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
}

exports.routes = routes;

