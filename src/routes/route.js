const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookControllerr= require("../controllers/bookControllerr")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook", BookControllerr.createBook  )

router.get("/getBooksData", BookControllerr.getBooksData)

router.get("/getCountBooks", BookControllerr.getCountBooks)

router.get("/getBookInYear", BookControllerr.getBookInYear)

router.get("/getXINRBooks", BookControllerr.getXINRBooks)
router.get("/getParticularBooks", BookControllerr.getParticularBooks)

router.get("/getRandomBooks",BookControllerr.getRandomBooks)
module.exports = router;