const publisherModel=require("../models/Newpublisher")

const publisher= async function(req, res){
    let data= req.body
    let saveData=await publisherModel.create(data)
    res.send({msg:saveData})
}

const getpublisher=async function (req,res){
    let all=await publisherModel.find()
    res.send({msg:all})
}
module.exports.publisher=publisher
module.exports.getpublisher=getpublisher