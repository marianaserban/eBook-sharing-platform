const Users=require('../models/Users').Users
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const registerUser=async(req,res)=>{
    if (req.body.userName === "" || req.body.password === "" || req.body.firstName===""|| req.body.lastName===""||req.body.email===""||req.body.confirmPassword==="") {
        return res.status(500).send({ message: "Please fill out all fields" });
    }
    if(req.body.password!==req.body.confirmPassword){
        return res.status(500).send({ message: "Passwords don't match" });
    }
    console.log(req.body)
    // if((!req.body.email.match(/[a-zA-Z0-9_\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9\.]{2,5}$/))){
    //     return res.status(500).send({ message: "Invalid email format" });
    // }
    // let userFound = await findUserByUsername(req.body.userName);
    // if (userFound) {
    //     return res.status(409).send({ message: "User already exists" });
    // }
   

    try {
        const salt = await bcrypt.genSaltSync(10);
        let ePassword = await bcrypt.hashSync(req.body.password, salt);
        Users.create({
            userName: req.body.userName,
            email:req.body.email,
            password: ePassword,
            firstName:req.body.firstName,
            lastName:req.body.lastName
        // },
        //     {
        //         where:
        //             { id: req.params.id }
        //     });
        })
        res.status(201).send({ message: `User created` });
    } catch (err) {
        return res.send({ message: `Error during register` });
    }
}
module.exports={
    registerUser
}