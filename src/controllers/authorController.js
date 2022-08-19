const authorModel= require("../models/authorModel")
const bookModel = require("../models/bookModel")
const  BookModel=require("../models/bookModel")
const createAuthor= async function (req, res) {
    let data= req.body
    let savedData= await authorModel.create(data)
    res.send({msg: savedData})
}

const getAuthorData= async function (req, res) {
    let allAuthor= await authorModel.find()
    res.send({msg: allAuthor})
}


const getBookData= async function (req, res) {
     let Author= await authorModel.findOne({ author_name:"Chetan Bhagat"}).select({author_id:1, _id:0})
     let Books=await BookModel.find({author_id:{$eq:Author.author_id}})
    res.send({msg:Books})
}

const findAuthor=async function (req, res){
     let data=await BookModel.findOneAndUpdate({name:"Two states"},{$set:{price:100}})//.?
    let All=await authorModel.findOne({author_id:{$eq:data.author_id}})//.//select({author_name:1,_id:0})
     res.send({msg:All,data})

    // let final=await BookModel.findOneAndUpdate()
}
module.exports.createAuthor= createAuthor
module.exports.getAuthorData= getAuthorData
module.exports.getBookData= getBookData
module.exports.findAuthor= findAuthor