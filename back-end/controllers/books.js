const Books = require('../models').Books

const getFreeBooks = async (req, res) => {
        try {
            let books = await Books.findAll({
                where: {
                    availability: true,
                }
            })
            res.status(200).json(books)
        } catch (error) {
            res.status(500).send({
                message: "Database error"
            })
        }
};

module.exports = {
    getFreeBooks
}