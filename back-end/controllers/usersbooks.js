const UsersBooks = require('../models').UsersBooks

const addAcces = async (req, res) => {
    const acces = {
        userId: req.params.userId,  
        bookId: req.params.bookId                                        
    }
    try {
        await UsersBooks.create(acces)
        res.status(201).send({
            message: 'Book added'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Database error'
        })
    }

};

module.exports = {
    addAcces 
}