const collegModel=require("../models/collegeModel")


const valid=function(value){
    let r=/\D/
    if(typeof value=="undefined" || value==null)return false
    if(typeof value=="string" && value.trim().length>0 && r.value)return true
    return false
}

const validEmail=function(value){
    let r=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return r.test(value)
}

const validMobile=function(value){
    let r= /^[6-9][0-9]{9}$/
    r.test(value)
}

const createCollege=async function(req,res){
    try{
        const requestBody=req.body
        const requestQuery=req.query
        if(!valid(requestQuery))
            return res.status(400).send({status:false,msg:"invalid entry "})
        if(valid(requestBody))
            return res.send({status:false,msg:"data is required in request body"})

        if(Object.keys(requestBody).length>3)
            return res.status(400).send({status:false,msg:"invalid data entry inside request body"})
    
        const {name,fullName,logoLink}=requestBody
        if(!valid(name))
            return res.status(400).send({status:false,msg:"name is missing or invalid"})
        if(!valid(fullName))
            return res.status(400).send({status:false,msg:"fullName is missing or invalid"})
        if(!valid(logoLink))
            return res.status(400).send({status:false,msg:"logoLink is missing or invalid"})
        let college=await collegModel.findOne({name:name})
        if(college)
            return res.status(409).send({status:false,msg:"college is already exist"})
        let result=await collegModel.creat(requestBody)
        res.status(201).send({status:true,msg:"college is registerd",data:result}) 

    }catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}


module.exports=createCollege