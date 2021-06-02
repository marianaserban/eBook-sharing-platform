const router = require("express").Router();
const middlewares=require('../controllers/middlewares')
const books=require('../controllers/books')
const users=require('../controllers/users')
const reviews=require('../controllers/reviews')
const usersbooks=require('../controllers/usersbooks')
const verifySignUp = require("../services/verifySignUp");
const auth=require('../controllers/auth')

const multer = require('multer');
const path=require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

// router.post('/upload', upload.single('path'), (req, res, next) => {
//   //const file = req.file
//   // if (!file) {
//   //   const error = new Error('Please upload a file')
//   //   error.httpStatusCode = 400
//   //   return next(error)
//   // }
//    // res.send(file)
//     console.log(req.body.files)
//     console.log(req.files)
  
// })

router.get('/reset', middlewares.resetDatabase);
router.get('/books',books.getFreeBooks)
router.post('/upload/:id',books.bookUpload);
router.get('/usersWithAcces/:bookId', users.getUsersWithAcces);
router.get('/users', users.getAllUsers);
router.post('/review', reviews.addReview);
router.post('/addAcces/:userId/:bookId', usersbooks.addAcces)
router.delete('/removeAcces/:userId/:bookId', usersbooks.removeAcces)
router.get('/superUser/:bookId', books.getSuperUser)
router.get('/average/:bookId', reviews.getAverage)
router.get('/reviews/:bookId', reviews.getReviews)
router.get('/reviews/users/:bookId', users.getUsersWithReviews) 
router.put('/user/:id',users.updateProfile)
router.get('/user/:id',users.getUser)
router.get('/uploads/:userId',books.getUploads)
router.get('/noOfReviews/:userId',reviews.getNoOfReviews)
router.put('/updateProfilePic/:userId', users.updateProfilePic)
router.delete('/deleteBook/:bookId', books.deleteBook)
router.delete('/deleteAccount/:userId', users.deleteAccount)
router.patch('/updatePass/:id', auth.updatePassword)
router.put('/updateBook/:bookId', books.updateBook)
router.put('/changeRole/:userId', users.changeRole)
router.get('/getAllReviews',reviews.getAllReviews)
router.get('/getAllBooks',books.getAllBooks)
router.get('/noOfGenres', books.getNoPerGenres)
router.get('/theMostApreciated', reviews.getTheMostApreciated)
router.get('/stats', reviews.getStats)
router.get('/privateBooks/:userId', usersbooks.getPrivateBooksOfUser)

module.exports = router;