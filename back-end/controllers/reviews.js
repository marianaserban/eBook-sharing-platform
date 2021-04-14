const Reviews = require('../models').Reviews

const addReview = async (req, res) => {
    const review = {
        content: req.body.content,
        raiting: req.body.raintig,
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

module.exports = {
    addReview
}