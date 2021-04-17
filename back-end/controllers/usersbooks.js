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

const removeAcces = async (req, res) => {

    try {
        const record = await UsersBooks.findOne({
            where: {
                userId: req.params.userId,
                bookId:req.params.bookId
            }
        })

        if(record){
            await record.destroy()
            res.status(201).send({
                message: 'Book deleted'
            })
        }      
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Database error'
        })
    }

};

module.exports = {
    addAcces,
    removeAcces
}