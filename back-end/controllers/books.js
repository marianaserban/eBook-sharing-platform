const Books = require('../models').Books
const Uploads = require('../models').Uploads
const Users = require('../models').Users
const Reviews = require('../models').Reviews
const UsersBooks = require('../models').UsersBooks

const getSuperUser = async (req, res) => {
  try {

    let upload = await Uploads.findOne({
      where: {
        bookId: req.params.bookId,
      }
    })

    let user = await Users.findOne({
      where: {
        id: upload.userId,
      }
    })

    res.status(200).json(user)

  } catch (error) {
    res.status(500).send({
      message: "Database error"
    })
  }
}
const getFreeBooks = async (req, res) => {
  try {
    let books = await Books.findAll({
      where: {
        availability: true,
      },
      include: [{
        model: Reviews,
      }]
    })

    let reviews=[]
    for(let i=0;i < books.length;i++ ){
        reviews.push(books[i].Reviews)
    }
    let array=[]
    for(let i=0 ;i< books.length;i++){

        let book={
            id:books[i].id,
            title:books[i].title,
            genre:books[i].genre,
            author:books[i].author,
            availability:books[i].availability,
            description:books[i].description,
            path:books[i].path,
            picture:books[i].picture,
            createdAt:books[i].createdAt,
            updatedAt:books[i].updatedAt,
            rating:getAverageOfBook(reviews[i])
        }
        array.push(book)
    }
    //let arr=array.slice(0,8)
    res.status(200).json(array)

  } catch (error) {
    res.status(500).send({
      message: "Database error"
    })
  }
};

function getAverageOfBook(reviews){
  let sum=0;
  if(reviews.length>0){
      reviews.forEach(element => {
          sum=sum+parseInt(element.raiting)
      });

      return(sum/reviews.length)
   }
   else{
     return 0;
  }
}

const updateBook = async (req, res) => {
  try {
    let book = await Books.findOne({
        where: {
            id: req.params.bookId,
        }
    })
    if(book){
      await book.update({availability:req.body.availability})
      res.status(200).json({ message: "changed" })
    }else{
        res.status(404).json({ message: "book not found" });
    }
    }catch (error) {
        res.status(500).send({
            message: "Database error"
        })
    }
}

const bookUpload = async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.path;
  const image = req.files.picture


  file.mv(`../front-end/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    console.log({ fileName: file.name, filePath: `/uploads/${file.name}` })
  });

  image.mv(`../front-end/public/uploads/${image.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    console.log({ fileName: image.name, filePath: `/uploads/${image.name}` })
  });

  // res.json({ fileName: image.name, filePath: `/uploads/${image.name}`,  fileName: file.name, filePath: `/uploads/${file.name}` });
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    availability: req.body.availability,
    description: req.body.description,
    path: `/uploads/${file.name}`,
    picture: `/uploads/${image.name}`
  }

  let bookId = 0
  let upload = {
    uploadDate: `${new Date()}`,
    bookId: bookId,
    userId: req.params.id
  }
  await Books.create(book)
    .then((result) => {
      upload.bookId = result.id
      Uploads.create(upload)
      res.status(201).send({ message: 'Book uploaded' })
    })
    .catch((error) => res.status(500).send({ message: 'Database error' }))
}

const getUploads = async (req, res) => {
  try {
    let uploads = await Uploads.findAll({
      where: {
        userId: req.params.userId,
      },
      include: {
        model: Books,
        include: {
          model: Reviews
        },
      },
    })

    let books = []
    for (let i = 0; i < uploads.length; i++) {
      let upload={
        Book: uploads[i].Book,
        rating: getAverageOfBook(uploads[i].Book.Reviews)
      }
      books.push(upload)
    }
    res.status(200).json(books)

  } catch (error) {
    res.status(500).send({
      message: "Database error"
    })
  }
}

const deleteBook = async (req, res) => {
  try {

    let book = await Books.findOne({
      where: {
        id: req.params.bookId,
      }
    })

    if (book) {
      await book.destroy();
      res.status(200).json({ message: "deleted" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Database error"
    })
  }
}

const getAllBooks = async (req, res) => {
  try {
    let books = await Books.findAll({
      where:{
        availability:true
      }, include: [{
        model: Reviews,
      }]
    })
    let reviews=[]
    for(let i=0;i < books.length;i++ ){
        reviews.push(books[i].Reviews)
    }
    let array=[]
    for(let i=0 ;i< books.length;i++){

        let book={
            id:books[i].id,
            title:books[i].title,
            genre:books[i].genre,
            author:books[i].author,
            availability:books[i].availability,
            description:books[i].description,
            path:books[i].path,
            picture:books[i].picture,
            createdAt:books[i].createdAt,
            updatedAt:books[i].updatedAt,
            rating:getAverageOfBook(reviews[i])
        }
        array.push(book)
    }
    res.status(200).json(array)
  } catch (error) {
    res.status(500).send({
      message: "Database error"
    })
  }
};
 
const getNoPerGenres=async (req, res) => {
  try {
    let nr=[]
    let books = await Books.findAll({
      where: {
        genre: 'Arts and Photography',
      }
    })
    nr.push(books.length)
    books = await Books.findAll({
      where: {
        genre: 'Biographies and Memoirs',
      }
    })
    nr.push(books.length)

    books = await Books.findAll({
      where: {
        genre: 'Business and Money',
      }
    })
    nr.push(books.length)

    books = await Books.findAll({
      where: {
        genre: 'Computers and Technology',
      }
    })
    nr.push(books.length)

    books = await Books.findAll({
      where: {
        genre: 'Education and Teaching',
      }
    })
    nr.push(books.length)

    books = await Books.findAll({
      where: {
        genre: 'Cookbooks, Food and Wine',
      }
    })
    nr.push(books.length)

    books = await Books.findAll({
      where: {
        genre: 'History',
      }
    })
    nr.push(books.length)

    books = await Books.findAll({
      where: {
        genre: 'Literature and Fiction',
      }
    })
    nr.push(books.length)

    books = await Books.findAll({
      where: {
        genre: 'Mystery, Thriller and Suspense',
      }
    })
    nr.push(books.length)

    books = await Books.findAll({
      where: {
        genre: 'Religion and Spirituality',
      }
    })
    nr.push(books.length)

    books = await Books.findAll({
      where: {
        genre: 'Romance',
      }
    })
    nr.push(books.length)

    books = await Books.findAll({
      where: {
        genre: 'Science and Math',
      }
    })
    nr.push(books.length)

    res.status(200).json(nr)

  } catch (error) {
    res.status(500).send({
      message: "Database error"
    })
  }
};

const getRating = async (req, res) => {
  try {
    let reviews = await Reviews.findAll({
        where: {
          bookId: req.params.bookId,
        }
    })
      res.status(200).json(getAverageOfBook(reviews))
    }catch (error) {
        res.status(500).send({
            message: "Database error"
        })
    }
}

module.exports = {
  getFreeBooks,
  bookUpload,
  getSuperUser,
  getUploads,
  deleteBook,
  updateBook,
  getAllBooks,
  getNoPerGenres,
  getRating,
}