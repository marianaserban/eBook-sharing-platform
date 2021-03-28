const router = require("express").Router();
const middlewares=require('../controllers/middlewares')
const books=require('../controllers/books')

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


module.exports = router;