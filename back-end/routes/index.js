const router = require("express").Router();
const middlewares=require('../controllers/middlewares')
const books=require('../controllers/books')

router.get('/reset', middlewares.resetDatabase);
router.get('/books',books.getFreeBooks)


module.exports = router;