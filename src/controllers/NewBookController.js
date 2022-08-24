const authorModel = require("../models/NewAuthorModel")
const bookModel= require("../models/NewBookModel")
const publisherModel=require("../models/Newpublisher")

const createBook= async function (req, res) {
        let book = req.body
    if(book.author){
           const check= await authorModel.findById(book.author)
          if(check){

    if(book.publisher){
          const  Check= await publisherModel.findById(book.publisher)
          if(Check){

     let bookCreated = await bookModel.create(book)
           res.send({data: bookCreated})

        }else res.send("plese enter correct publisher id")
          }else res.send("plese enter publisher id")
             }else res.send("plese enter correct author id")
                }else res.send("plese enter author id")
   
}

const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

const getBooksWithAuthorDetails = async function (req, res) {
    let allBook = await bookModel.find().populate(["author","publisher"])
     res.send({allBook})

}
const getSpecific=async function(req,res){
    let book=await publisherModel.find({$or:[{name:'Penguin'},{name:'HarperCollins'}]})
    // for(let i=0; i<book.length; i++){

    // let updateBook=await bookModel.updateMany({publisher:book[i]._id},{$set:{isHardCover:true}},{new:true})

     res.send({msg:book})}
// }

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData 
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
module.exports. getSpecific= getSpecific