const express = require("express")
const router = express.Router()

const internController = require("../controllers/internController")
const collegeController = require("../controllers/collegeController")





router.post("/functionup/interns",internController.createIntern)
router.post("/functionup/colleges",collegeController.createCollege)
router.get("/functionupInterns",collegeController.functionupInterns)











module.exports=router