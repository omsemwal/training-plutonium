// const { count } = require("console")
// const BookModel= require("../models/authorModel")

// const createBook= async function (req, res) {
//     let data= req.body
//     let saveData=await BookModel.create(data)
//     res.send({saveData})
// }

// const getBooksData=async function(req, res){
//     let allBooks=await BookModel.find().select({ bookName: 1, authorName: 1, _id: 0} )
//     res.send({allBooks})
// }

//     const getCountBooks=async function(req,res){
//     let allBooks=await BookModel.find().count()
//     res.send({msg:allBooks})
// }

//     const getBookInYear=async function(req, res){
//         let data=req.query.year
//         let allBooks=await BookModel.find({year:{$eq:data}})
//         res.send({allBooks})
//     }
    
//     const getXINRBooks=async function(req, res){
//         let allBooks=await BookModel.find({"prices.indianPrice":{$in:["100rupees","200rupees","500rupees"]} })
//         res.send({allBooks})
//     }
//     const getParticularBooks= async function (req, res) {
//     let allBooks= await BookModel.find({ year: req.body.year }).select({bookName:1,_id:0})
//     res.send(allBooks)
//  }

    
//    // async function(req, res){
//     // let allBooks= await BookModel.find( { bookName:  /^the/i  })
//     //     res.send({allBooks})
// // } 

// const getRandomBooks=async function(req, res){
//     let allBooks= await BookModel.find({$or:[{stockAvailable:true},{Pages:{$gt:500}}]})
//         res.send({ msg:allBooks})
// } 
// // const getRandomBooks= async function(req, res) {
// //     let allBooks = await BookModel.find({$or:[{stockAvailable:true},{ Pages: {$gt: 500}}]})
// //     res.send({msg: allBooks })
// // }

// module.exports.createBook=createBook
// module.exports.getBooksData=getBooksData
// module.exports.getBookInYear=getBookInYear
// module.exports.getCountBooks=getCountBooks
// module.exports.getXINRBooks=getXINRBooks
//  module.exports.getParticularBooks=getParticularBooks
// module.exports.getRandomBooks=getRandomBooks