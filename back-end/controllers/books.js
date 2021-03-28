const Books = require('../models').Books
const Uploads=require('../models').Uploads
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
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    
      const file = req.files.path;
      const image=req.files.picture
      
    
      file.mv(`../front-end/public/uploads/${file.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        console.log({fileName: file.name, filePath: `/uploads/${file.name}`})
      });
    
      image.mv(`../front-end/public/uploads/${image.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        console.log({fileName: image.name, filePath: `/uploads/${image.name}`})
      });
    
      // res.json({ fileName: image.name, filePath: `/uploads/${image.name}`,  fileName: file.name, filePath: `/uploads/${file.name}` });
      const book={
        title:req.body.title,
        author:req.body.author,
        genre:req.body.genre,
        availability:req.body.availability,
        description:req.body.description,
        path:`/uploads/${file.name}`,
        picture: `/uploads/${image.name}`
      }
    
      let bookId=0
      let upload={
        uploadDaye:Date.now(),
        bookId:bookId,
        userId:req.params.id
      }
      await Books.create(book)
      .then((result)=>{
        upload.bookId=result.id
        Uploads.create(upload)
        res.status(201).send({message: 'Book uploaded'})
      })
      .catch((error)=>res.status(500).send({ message: 'Database error'}))
}

module.exports = {
    getFreeBooks, 
    bookUpload
}