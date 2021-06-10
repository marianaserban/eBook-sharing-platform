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
           include: {
            model: Books,
            include: {
              model: Reviews
            },
          },
        })
        let books = []
        for (let i = 0; i < uploads.length; i++) {
          let upload={
            Book: uploads[i].Book,
            rating: getAverageOfBook(uploads[i].Book.Reviews)
          }
          books.push(upload)
        }
        res.status(200).json(books)
    
      } catch (error) {
        res.status(500).send({
          message: "Database error"
        })
      }
};
function getAverageOfBook(reviews){
    let sum=0;
    if(reviews.length>0){
        reviews.forEach(element => {
            sum=sum+parseInt(element.raiting)
        });
  
        return(sum/reviews.length)
     }
     else{
       return 0;
    }
  }


module.exports = {
    addAcces,
    removeAcces,
    getPrivateBooksOfUser
}