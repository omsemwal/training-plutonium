const express = require('express');
const router = express.Router();

const authorController= require("../controllers/NewAuthorController")
const bookController= require("../controllers/NewBookController")
const NewPublisherController=require("../controllers/NewPublisherController")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )

router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/publisher",NewPublisherController.publisher)
router.get("/getpublisher",NewPublisherController.getpublisher)

router.post("/createBook", bookController.createBook  )

router.get("/getBooksData", bookController.getBooksData)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)
router.get("/getSpecific",bookController.getSpecific)
module.exports = router;