const { default: mongoose } = require("mongoose")
const internModel = require("../models/internModel")




const createIntern = async function(req,res) {
    try{
    let data = req.body
    let paramsData = req.query
    let {name, mobile, email, collegeName,collegeId} = data

    if(Object.keys(data).length==0) return res.status.send({status:false,msg:"please provide all the details"})
    if(Object.keys(paramsData).length>0) return res.status.send({status:false,msg:"please provide the details in body"})


    if (!name) return res.status(400).send({status:false,msg:"name is required"})
    if (!mobile) return res.status(400).send({status:false,msg:"mobile is required"})
    if (!email) return res.status(400).send({status:false,msg:"email is required"})
    if (!collegeName) return res.status(400).send({status:false,msg:"collegename is required"})
    if (!collegeId) return res.status(400).send({status:false,msg:"collegeId is required"})

    if(!mongoose.Types.ObjectId.isvalid(collegeId)) return res.status(400).send({status:false,msg:"Please provide a valid collegeId"})

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Name validation <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
    
    let nameValidator = function(value) {
        return (/^[a-zA-Z]+$/.test(value))
    }
    if(!nameValidator(name)) return res.status(400).send({status:false,msg:"Give a propper name of yours"})

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> mobile validation <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

    let mobileValidator = function(mob) {
        return /^[6-9]\d{9}$/gi.test(mob)
    }
    if(!mobileValidator(mobile)) return res.status(400).send({status:false,msg:"Give a propper mobile number"})
    let mobileNo = await internModel.findOne({mobile:mobile})
    if(mobileNo) return res.status(409).send({status:false,msg:"The mob no is already in use please provide another mob no"})

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Email validation <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

    let emailValidator = function (mail) {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    }
    if (!emailValidator(email)) return res.status(400).send({status:false,msg:"Please enter your correct email id"})
    let emailId = await internModel.findOne({email:email})
    if(emailId) return res.status(409).send({status:false,msg:"The emailId is already in use please provide anothe emailId"})

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Create Intern <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

    let internData = await internModel.create(data)
    res.status(201).send({status:true,msg:"Intern created successfully",data:internData})
    } catch (error) {
        res.status(500).send({status:false,msg:error.message})
    }
}





module.exports.createIntern = createIntern