const UsersBooks = require('../models').UsersBooks
const Books=require('../models').Books
const Reviews = require('../models').Reviews

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

const getPrivateBooksOfUser = async (req, res) => {
    try {
        let uploads = await UsersBooks.findAll({
          where: {
            userId: req.params.userId,
           },
            include: [{
                model: Books, Reviews
            }],
        })
        let books = []
        for (let i = 0; i < uploads.length; i++) {
          books.push(uploads[i].Book)
        }
        res.status(200).json(uploads)
    
      } catch (error) {
        res.status(500).send({
          message: "Database error"
        })
      }
};



module.exports = {
    addAcces,
    removeAcces,
    getPrivateBooksOfUser
}