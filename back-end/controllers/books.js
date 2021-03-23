const Books = require('../models').Books

const getFreeBooks = async (req, res) => {
    let books = Books.findAll({
        where: {
            availability: true,
        }
    }).then(books => {
        res.status(200).send({
            books
        })
    })
        .catch(() => {
            res.status(500).send({
                message: "Database error"
            })
        })
};

module.exports = {
    getFreeBooks
}