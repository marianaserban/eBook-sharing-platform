const connection = require('../models/index.js').connection

const resetDatabase = async (req, res) => {
     connection.sync({
        force: true
    })
    .then(() => {
        res.status(201).send({
            message: 'Database reset'
        })
    })
    .catch(() => {
        res.status(500).send({
            message: 'Error during database resetting'
        })
    })
};

module.exports = {
   resetDatabase
}