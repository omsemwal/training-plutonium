const userModel=require ("../models/userModel")
const jwt = require("jsonwebtoken")


const mid1=async function(req,res,next){
   try{
let token = req.headers["x-Auth-token"];

if (!token) token = req.headers["x-auth-token"];
if (!token) {return res.status(401).send({ status: false, msg: "token must be present" });
  }
  let decodedToken = jwt.verify(token, "Hariom semwal");
  if (!decodedToken){
    return res.status(404).send({  msg: "token is invalid" });} 
    let someOne=req.params.userId
   
    if(decodedToken.userId!==someOne){
      return res.status(404).send({ msg:"you not access this id" })
    }
 next()
    } catch(error){res.status(500).send(error.message)}
 }
const mid2=async function(req,res,next){ 
  let someOne=req.params.userId
if(decodedToken.userId!==someOne){
  return res.send({ msg:"you not access this id" })
}next()
}
module.exports.mid1=mid1
module.exports.mid2=mid2