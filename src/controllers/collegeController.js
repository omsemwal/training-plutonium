const collegModel=require("../models/collegeModel")
const internModel=require("../models/internModel")


const valid=function(value){
    if(typeof value=="undefined" || value==null)return false
    if(typeof value=="string" && value.trim().length>0 )return true
    return false
}
const nameValidator=function(value){
    return /^[a-zA-Z]+$/.test(value)
}
const fullNameValidator=function(value){
    return /^[a-zA-z]+([\s]?,?[a-zA-z]+)*$/.test(value)
}

const createCollege=async function(req,res){
    try{
        const requestBody=req.body
        const requestQuery=req.query
        if(Object.keys(requestQuery).length>0)
            return res.status(400).send({status:false,msg:"invalid entry "})
        if(Object.keys(requestBody).length==0)
            return res.status(400).send({status:false,msg:"data is required in request body"})

        if(Object.keys(requestBody).length>3)
            return res.status(400).send({status:false,msg:"invalid data entry inside request body"})
    
        const {name,fullName,logoLink}=requestBody
        if(!name)
            return res.status(400).send({status:false,msg:"name is required"})
        if(!fullName)
            return res.status(400).send({status:false,msg:"fullName is required"})
        if(!logoLink)
            return res.status(400).send({status:false,msg:"logoLink is required"})
        if(!nameValidator(name))
            return res.status(400).send({status:false,msg:"name is invalid"})
        if(!fullNameValidator(fullName))
            return res.status(400).send({status:false,msg:"fullName is invalid"})
        if(!valid(logoLink))
            return res.status(400).send({status:false,msg:"logoLink is invalid"})
        let college=await collegModel.findOne({name:name})
        if(college)
            return res.status(409).send({status:false,msg:"college is already exist"})
        let result=await collegModel.create(requestBody)
        res.status(201).send({status:true,msg:"college is registerd",data:result}) 

    }catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}

const functionupInterns=async function (req,res){
    try{
   let save=req.query
    if(!save){return res.status(400).send({status:false,msg:"plese enter data"})}
 
    let data =await  collegModel.findOne({name:save})
    if(!data){return res.status(404).send({status:false,msg:"college not found"})}
 
    let saveData=await internModel.find({_id:data._id})

    data["interns"] = saveData


     return res.status(200).send({status:true,msg:data})
    }
     catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
 }
 }
 module.exports.functionupInterns=functionupInterns


module.exports.createCollege = createCollege