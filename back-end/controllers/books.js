const Books = require('../models').Books

const getFreeBooks = async (req, res) => {
        try {
            let books = await Books.findAll({
                where: {
                    availability: true,
                }
            })
            res.status(200).json(books)
        } catch (error) {
            res.status(500).send({
                message: "Database error"
            })
        }
};

const bookUpload=async(req,res)=>{

   // if(req.files){
        var Bookfile = req.body.path;
        var PictureFile = req.body.picture;
        const book={
            title:req.body.title,
            author:req.body.author,
            genre:req.body.genre,
            availability:req.body.availability,
            description:req.body.description,
            path:Bookfile,
            picture:PictureFile
        }

       // file.mv('uploads/', function(err) {

            try {
                await Books.create(book)
                res.status(201).send({
                    message: 'Book uploaded'
                })
            } catch (error) {
                console.log(error);
                res.status(500).send({
                    message: 'Database error'
                })
            }    
        
      //   });

   // }                            
           
}


module.exports = {
    getFreeBooks, bookUpload
}