const Reviews = require('../models').Reviews
const Books = require('../models').Books

const addReview = async (req, res) => {
    const review = {
       
        content: req.body.content,
        title:req.body.title,
        raiting: req.body.raiting,
        addDate:req.body.addDate,        
        userId: req.body.userId,
        bookId:req.body.bookId       
    }
    try {
        await Reviews.create(review)
        res.status(201).send({
            message: 'Review added'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Database error'
        })
    }
};

const getAverage=async (req, res) => {

    let reviews = await Reviews.findAll({
        where: {
            bookId: req.params.bookId,
        }
    })
    let sum=0;
    if(reviews.length>0){
        reviews.forEach(element => {
            sum=sum+parseInt(element.raiting)
        });

        res.status(200).json(sum/reviews.length)
     }
     else{
        res.status(200).json(0)
    }

}

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

const getReviews=async (req, res) => {
    let reviews = await Reviews.findAll({
        where: {
            bookId: req.params.bookId,
        }
    })
    res.status(200).json(reviews)
}

const getNoOfReviews=async (req, res) => {
    let reviews = await Reviews.findAll({
        where: {
            userId: req.params.userId,
        }
    })
    if(reviews){
        res.status(200).json(reviews.length)
    }else{
        res.status(200).json(0)

    }
    
}

const getAllReviews=async (req, res) => {
    try {
        let reviews = await Reviews.findAll({})
        res.status(200).json(reviews)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Database error'
        })
    }
   
}

function compareDesc(a, b) {
    const bandA = a.rating
    const bandB = b.rating
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = -1;
    } else if (bandA < bandB) {
      comparison = 1;
    }
    return comparison;
}

const getTheMostApreciated=async (req, res) => {
    try {
        let books = await Books.findAll({
            include: [{
                model: Reviews,
            }],
        })
        let reviews=[]
        for(let i=0;i < books.length;i++ ){
            reviews.push(books[i].Reviews)
        }
        let theMostApreciated=[]
        for(let i=0 ;i< books.length;i++){

            let book={
                id:books[i].id,
                title:books[i].title,
                genre:books[i].genre,
                author:books[i].author,
                availability:books[i].availability,
                description:books[i].description,
                path:books[i].path,
                picture:books[i].picture,
                createdAt:books[i].createdAt,
                updatedAt:books[i].updatedAt,
                rating:getAverageOfBook(reviews[i])
            }
            theMostApreciated.push(book)
        }
        theMostApreciated.sort(compareDesc)
        res.status(200).json(theMostApreciated.slice(0,10))
    } catch (error) {
        res.status(500).send({
            message: "Database error"
        })
    }
}


module.exports = {
    addReview,
    getAverage,
    getReviews,
    getNoOfReviews,
    getAllReviews,
    getTheMostApreciated
}