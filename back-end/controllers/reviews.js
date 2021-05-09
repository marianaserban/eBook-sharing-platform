const Reviews = require('../models').Reviews

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


module.exports = {
    addReview,
    getAverage,
    getReviews,
    getNoOfReviews,
    getAllReviews
}