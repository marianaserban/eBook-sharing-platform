const config = require('../config/auth');
const Users=require('../models').Users
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const signup = (req, res) => {
    // Save User to Database
    Users.create({
      userName: req.body.userName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      role:'user'
    })
      .then(user => {
          console.log(user)
           res.send({ message: "User was registered successfully!" });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

const signin = (req, res) => {
    Users.findOne({
      where: {
        userName: req.body.userName
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
    
          res.status(200).send({
            id: user.id,
            userName: user.userName,
            email: user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            role:user.role,
            accessToken: token,
          });

      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  const updatePassword = async(req, res) => {
    const { password, oldPassword } = req.body
    const user = await Users.findByPk(req.params.id)
    bcrypt.compare(oldPassword, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then(user => {
                res.send(user)
   
              })
              .catch(err => console.log(err));
          });
        })
      } else {
        res.status(400).send({
          message: "Old password do not match"
        })
      }
    });
}
  module.exports={
      signup,
      signin,
      updatePassword
  }
