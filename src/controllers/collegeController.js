const collegModel = require("../models/collegeModel")
const internModel = require("../models/internModel")


const nameValidator = function (value) {
    return /^[\s]*[a-zA-Z]+[\s]*$/.test(value)
}
const fullNameValidator = function (value) {
    return /^[\s]*[a-zA-z]+([\s\,\-]*[a-zA-z]+)*[\s]*$/.test(value)
}
const logoValidator = function (value) {
    return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(value)
}

exports.createCollege = async function (req, res) {
    try {
        const requestBody = req.body
        const requestQuery = req.query
        if (Object.keys(requestQuery).length > 0)
            return res.
                status(400).
                    send({ status: false, msg: "invalid entry " })
        
        if (Object.keys(requestBody).length == 0)
            return res.
                status(400).
                    send({ status: false, msg: "data is required in request body" })

        if (Object.keys(requestBody).length > 4)
            return res.
                status(400).
                    send({ status: false, msg: "invalid data entry inside request body" })

        const { name, fullName, logoLink } = requestBody
        if (!name)
            return res.
                status(400).
                    send({ status: false, msg: "name is required" })
        if (!fullName)
            return res.
                status(400).
                    send({ status: false, msg: "fullName is required" })
        if (!logoLink)
            return res.
                status(400).
                    send({ status: false, msg: "logoLink is required" })

/************************************* Name Validation ***********************************/        
        if (!nameValidator(name))
            return res.
                status(400).
                    send({ status: false, msg: "name is invalid" })
/**************************************FullName Validation ***********************************/        
        
        if (!fullNameValidator(fullName))
            return res.
                status(400).
                    send({ status: false, msg: "fullName is invalid" })
/************************************* logoLink Validation ***************************************/

        if (!logoValidator(logoLink))
            return res.
                status(400).
                    send({ status: false, msg: "logoLink validation invalid" })

/**************************************** Unickness Checking of Name *****************************************/
        let college = await collegModel.findOne({ name: name })
        if (college)
            return res.
                status(409).
                    send({ status: false, msg: "college is already exist" })

/****************************************** College Creation ***********************************************/                    
        let obj={
            name:name.trim(),
            fullName:fullName.trim(),
            logoLink:logoLink.trim()
        }
        let result = await collegModel.create(obj)
        return res.
            status(201).
                send({ status: true, msg: "college is registerd", data: result })

    } catch (err) {
        res.
            status(500).
                send({ status: false, msg: err.message })
    }
}

const functionupInterns = async function (req, res) {
    try {
        let requestQuery = req.query.collegeName
        let requestBody=req.body
        if(Object.keys(requestBody).length>0)
            return res.
                status(400).
                    send({status:false,msg:"invalid data entry"})
        if (!requestQuery) 
            return res.
                status(400).
                    send({ status: false, msg: "please enter the collegeName" }) 
        if(Object.keys(requestQuery).length>1)
            return res.
                status(400).
                    send({status:false,msg:"invalid request"})
        let data = await collegModel.findOne({ name: requestQuery }).select({ name: 1, fullName: 1, logoLink: 1, _id: 1 })
        if (!data)
            return res.
                status(404).
                    send({ status: false, msg: "college not found" }) 

        let saveData = await internModel.find({ collegeId: data._id }).select({ name: 1, mobile: 1, email: 1 })
        let obj = {
            name: data.name,
            fullName: data.fullName,
            logoLink: data.logoLink,
            interns: saveData
        }
        res.
            status(200).
                send({ status: true, collegedetails: {data:obj }})
    }
    catch (err) {
        res.
            status(500).
                send({ status:false,msg: err.message });
    }
}


module.exports.functionupInterns = functionupInterns


