const bookModel=require('../models/bookModel')

const createBook =  async function( req,res){
    let save= req.body
    let savedData = await bookModel.create(save)
    res.send({msg:savedData})
}
const getBookData = async function (req,res){
    let allBook = await bookModel.find({authorName:"Robert Kiyosaki and sharon L.Lecthter  "})
    res.send({msg:allBook})
}
module.exports.createBook=createBook
module.exports.getBookData=getBookData