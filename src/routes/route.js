const express = require('express');
const abc = require('../introduction/intro')
 const logger=require('../logger/logger')
 const util=require('../util/helper')
 const validator=require('../validator/formatter')
const router = express.Router();

router.get('/test-me', function (req, res) {
   console.log(util.Date)
   console.log(util.Batch)
     res.send('My second ever api!')
   
});


router.get('/test-you', function(req, res){
     console.log(logger.welcome)//(logger.welcome) ///assignment 1 answer
  res.send('This is the second routes implementation')
})

router.get('/test-we', function(req,res){
    console.log(validator.change) //3rd problem
    res.send('this is third one')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason