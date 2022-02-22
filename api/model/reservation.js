const moment = require("moment");

const routes = (app, db) => {
    const Reservation = db.Reservation;
    const sequelize = db.sequelize;

    /**
     * Getting all reservations
     */
    app.get('/reservations', (req, res) => {
        Reservation.findAll().then(reservations => res.json(reservations));
    })

    /**
     * Search for reservation by email, start date, end date
     */
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

    /**
     * Aggregate reservation on group parameter
     */
    app.get('/reservations/agg', async (req, res) => {

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
        let group = [req.query.group];
        try {
            const results = await Reservation.findAll({
                where: query,
                group: group,
                attributes: [[req.query.group, "value"], [sequelize.fn('COUNT', req.query.group), 'count']],
                order: [[sequelize.literal('count'), "DESC"]]
            });
            res.json(results);
        } catch (e) {
            res.status(500).json({error: e})
        }
    })

    /**
     * Save reservation
     */
    app.post('/reservations', async function (req, res) {
        const reservation = req.body
        const date = moment(reservation.start).format('DD-MM-YYYY')
        try {
            const resa = await Reservation.create({
                email: reservation.email,
                start: reservation.start,
                end: reservation.end,
                title: reservation.title,
                date: date,
                tag: reservation.tag,
                availabilityId: reservation.availabilityId
            })
            res.json(resa);
        } catch (e) {
            console.log(e)
            res.status(500).send({message: e});
        }
    });

    /**
     * Delete reservation by email and id
     * The email serve as a confirmation before setting a real oauth authentication
     */
    app.delete("/reservations", async function (req, res) {
        try {
            if (req.query.id && req.query.mail) {
                console.log("Deleting Reservation: " + req.query.id);
                const reservation = await Reservation.findOne({
                    where: {id: parseInt(req.query.id), email: req.query.mail}
                })
                if (reservation == null) {
                    return res.status(400).send("no record with this id and email")
                }
                Reservation.destroy({
                    where: {id: parseInt(req.query.id), email: req.query.mail}
                }).then(() => {
                    return res.status(200).send({})
                }).catch(() => {
                    return res.status(400).send("Not possible")
                })
            } else {
                res.status(400).send("Please specify an id and mail");
            }
        }
        catch (error) {
            res.status(500).send("Problem on the server :"+error)
            
        }
    });
}

exports.routes = routes;
