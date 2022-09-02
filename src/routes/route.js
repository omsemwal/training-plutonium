const express = require('express');
const router = express.Router();
const CowinController = require("../controllers/cowinController")
const memeController = require("../controllers/memecontroller")
const middleware = require("../middlewares/commonMiddlewares")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)
router.post("/cowin/getOtp", CowinController.getOtp)
router.get("/cowin/district", CowinController.district)
router.get("/getMemes",memeController.getMemes)
router.post("/creatememes",middleware.mid1, memeController.creatememes)
// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;