const moment = require("moment")
// database file using orm sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    // The `host` parameter is required for other databases
    // host: 'localhost'
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const Reservation = sequelize.define('reservations', {
    start: Sequelize.DATE,
    end: Sequelize.DATE,
    title: Sequelize.STRING,
    tag: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Must be a valid email address",
            }
        }
    }
});

const Availabilities = sequelize.define('availabilities', {
    start: Sequelize.DATE,
    end: Sequelize.DATE,
});

Availabilities.hasMany(Reservation, {as: "reservations"});
Reservation.belongsTo(Availabilities, {
    foreignKey: "availabilityId",
    as: "availability",
});
sequelize.sync({force: true})
    .then(() => {
        console.log(`Database & tables created!`);
        Availabilities.bulkCreate([{
            start: moment(),
            end: moment().add(8, "hours"),
        }]);

    }).then(async () => {
    const availability = await Availabilities.findOne();
    const res = [
        {
            email: 'guillaume.quispe@gmail.com',
            title: 'Footing',
            start: moment(),
            end: moment().add(2, "hours"),
            tag: "Work",
            availabilityId: availability.id
        },
        {
            email: 'newuser@gmail.com',
            title: 'meeting',
            start: moment().add(4, "hours"),
            end: moment().add(6, "hours"),
            tag: "Sport",
            availabilityId: availability.id

        },
        {
            email: 'newuser@gmail.com',
            title: 'play',
            start: new Date(2022, 2, 1, 14, 0, 0, 0),
            end: new Date(2022, 2, 1, 16, 0, 0, 0),
            tag: "Entertainment",
            availabilityId: availability.id
        }
    ];
    await res.map(async (resa) => {
        console.log(resa.availabilityId);
        await Reservation.create(resa)
    })
});

module.exports = {Reservation, sequelize, Availabilities}