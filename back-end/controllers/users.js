const Users = require('../models').Users
const UsersBooks=require('../models').UsersBooks
const Reviews=require('../models').Reviews
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//get users with acces
const getUsersWithAcces = async (req, res) => {
    try {
        let usersWithAcces = await UsersBooks.findAll({
            where: {
                bookId: req.params.bookId,
            },
            include: [{
                model: Users,
            }],
        })
        let users=[]
        for(let i=0;i < usersWithAcces.length;i++ ){
            users.push(usersWithAcces[i].User)
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({
            message: "Database error"
        })
    }
};

//get all users
const getAllUsers = async (req, res) => {
    try {
       let allUsers = await Users.findAll({})
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).send({
            message: "Database error"
        })
    }
};

const getUsersWithReviews = async (req, res) => {
    try {
        let usersReviews = await Reviews.findAll({
            where: {
                bookId: req.params.bookId,
            },
            include: [{
                model: Users,
            }],
        })
        let users=[]
        for(let i=0;i < usersReviews.length;i++ ){
            users.push(usersReviews[i].User)
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({
            message: "Database error"
        })
    }
};

const updateProfile = async (req, res) => {
    try {
        let user = await Users.findOne({
            where: {
                id: req.params.id,
            }
        })
        if(user){
            await user.update(req.body);
            res.status(202).json({ message: "accepted" });
        }else{
            res.status(404).json({ message: "user not found" });
        }


    } catch (error) {
        res.status(500).send({
            message: "Database error"
        })
    }
};

const getUser=async (req, res) => {
    try {
        let user = await Users.findOne({
            where: {
                id: req.params.id,
            }
        })
        if(user){
            res.status(202).json(user);
        }else{
            res.status(404).json({ message: "user not found" });
        }
    } catch (error) {
        res.status(500).send({
            message: "Database error"
        })
    }
};


module.exports = {
    getUsersWithAcces,
    getAllUsers,
    getUsersWithReviews,
    updateProfile,
    getUser,
}