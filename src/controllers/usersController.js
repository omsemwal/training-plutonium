const UsersModel= require("../models/usersModel")


const createUsers= async function (req, res) {
 let data= req.body
 let saveData=await UsersModel.create(data)
 res.send({msg:saveData})

}


const getUsers= async function (req, res) {
    let InHeaders= req.headers.isfreeappuser
    if(InHeaders==true){
       
let saveData=await UsersModel.find()
res.send({msg:saveData})
    }else
        res.send("this is required")
    }
    // let webHeader=req.headers.isfreeappuser
    //  res.send(req.headers)}
    // let saveData=await UsersModel.find()
    // res.send({msg:saveData})}
module.exports.createUsers=createUsers
 module.exports.getUsers=getUsers
//     res.send({msg:data})
//     let tokenDataInHeaders= req.headers.token
//     //Get all headers from request
//     console.log("Request headers before modificatiom",req.headers)
//     //Get a header from request
//     console.log(req.headers.batch)
//     console.log(req.headers["content-type"])
//     console.log(tokenDataInHeaders)
//     //Set a header in request
//  console.log (req.headers.address)
//     req.headers['month']='June' //req.headers.month = "June"
