const { default: mongoose } = require("mongoose")
const internModel = require("../models/internModel")

let nameValidator = function (value) {
    return (/^[\s]*[a-zA-Z]+([\s]?[a-zA-Z]+)*[\s]*$/.test(value))
}

let mobileValidator = function (mob) {
    return /^[\s]*[6-9]\d{9}[\s]*$/gi.test(mob)
}

let emailValidator = function (mail) {
    return (/^[\s]*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+[\s]*$/.test(mail))
}

const createIntern = async function (req, res) {
    try {
        let requestBody = req.body
        let requestQuery = req.query
        let { name, mobile, email, collegeId } = requestBody

        if (Object.keys(requestBody).length == 0)
            return res.
                status(400).
                send({ status: false, msg: "please provide all the details" })

        if (Object.keys(requestQuery).length > 0)
            return res.
                status(400).
                send({ status: false, msg: "invalid entry" })


        if (!name)
            return res.
                status(400).
                send({ status: false, msg: "name is required" })

        if (!mobile)
            return res.
                status(400).
                send({ status: false, msg: "mobile is required" })

        if (!email)
            return res.
                status(400).
                send({ status: false, msg: "email is required" })

        if (!collegeId)
            return res.
                status(400).
                send({ status: false, msg: "collegeId is required" })

/************************************* Name Validation ***************************************/                

        if (!nameValidator(name))
            return res.
                status(400).
                send({ status: false, msg: "Give a valid Name" })

/****************************************** Mobile No Validation ***************************************/
        if (!mobileValidator(mobile))
            return res.
                status(400).
                send({ status: false, msg: "Give a Valid mobile number" })

/************************************** EmailId Validation **********************************************/
        if (!emailValidator(email))
            return res.
                status(400).
                send({ status: false, msg: "Please enter your correct email id" })

/**************************************** CollegeId Validation ***********************************************************************/
        if (!mongoose.Types.ObjectId.isValid(collegeId))
            return res.
                status(400).
                send({ status: false, msg: "Please provide a valid collegeId" })

/********************************************* Unickness of MobileNo checking ************************************************/                
        let mob = await internModel.findOne({ mobile: mobile })
        if (mob)
            return res.
                status(409).
                send({ status: false, msg: "This Mobile no is alreday exist" })
/************************************************* Unickness of EmailId checking **********************************/
        let emailId = await internModel.findOne({ email: email })
        if (emailId)
            return res.
                status(409).
                send({ status: false, msg: "The emailId is already in use please provide anothe emailId" })

/******************************************** Creation of Intern **************************************************/                
        let obj={
            name:name.trim(),
            mobile:mobile.trim(),
            email:email.trim(),
            collegeId:collegeId.trim()
        }
        let internData = await internModel.create(obj)
        return res.
            status(201).
                send({ status: true, msg: "Intern created successfully", data: internData })
    } catch (error) {
        return res.
            status(500).
                send({ status: false, msg: error.message })
    }
}





module.exports.createIntern = createIntern