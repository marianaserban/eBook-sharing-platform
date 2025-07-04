const Users=require('../models').Users


const checkDuplicateUsernameOrEmail = (req, res, next) => {

   // Email
   Users.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Email is already in use!"
      });
      return;
    }

    next();
  });

  // Username
  console.log(req.body.password);
  Users.findOne({
    where: {
      userName: req.body.userName
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Username is already in use!"
      });
      return;
    }

  
  });
};

module.exports={
    checkDuplicateUsernameOrEmail
}