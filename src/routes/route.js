const express = require("express")
const router = express.Router()

const internController = require("../controllers/internController")
const collegeController = require("../controllers/collegeController")





router.post("/functionup/interns",internController.createIntern)
router.post("/functionup/colleges",collegeController.createCollege)












module.exports=router