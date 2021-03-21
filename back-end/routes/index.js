const router = require("express").Router();
const middlewares=require('../controllers/middlewares')

router.get('/reset', middlewares.resetDatabase);






module.exports = router;