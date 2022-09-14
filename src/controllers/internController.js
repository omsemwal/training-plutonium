const { default: mongoose } = require("mongoose")
const internModel = require("../models/internModel")

let nameValidator = function (value) {
    return (/^[a-zA-Z]+([\s]?[a-zA-Z]+)*$/.test(value))
}

let mobileValidator = function (mob) {
    return /^[6-9]\d{9}$/gi.test(mob)
}

let emailValidator = function (mail) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
}

const createIntern = async function (req, res) {
    try {
        let data = req.body
        let paramsData = req.query
        let { name, mobile, email, collegeId } = data

        if (Object.keys(data).length == 0)
            return res.
                status(400).
                send({ status: false, msg: "please provide all the details" })

        if (Object.keys(paramsData).length > 0)
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

        if (!nameValidator(name))
            return res.
                status(400).
                send({ status: false, msg: "Give a valid Name" })

        if (!mobileValidator(mobile))
            return res.
                status(400).
                send({ status: false, msg: "Give a Valid mobile number" })

        if (!emailValidator(email))
            return res.
                status(400).
                send({ status: false, msg: "Please enter your correct email id" })

        if (!mongoose.Types.ObjectId.isValid(collegeId))
            return res.
                status(400).
                send({ status: false, msg: "Please provide a valid collegeId" })

        let m = await internModel.findOne({ mobile: mobile })
        if (m)
            return res.
                status(409).
                send({ status: false, msg: "This Mobile no is alreday exist" })

        let emailId = await internModel.findOne({ email: email })
        if (emailId)
            return res.
                status(409).
                send({ status: false, msg: "The emailId is already in use please provide anothe emailId" })

        let internData = await internModel.create(data)
        res.
            status(201).
            send({ status: true, msg: "Intern created successfully", data: internData })
    } catch (error) {
        res.
            status(500).
            send({ status: false, msg: error.message })
    }
}





module.exports.createIntern = createIntern