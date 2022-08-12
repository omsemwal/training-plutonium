const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});

router.get('/hello', function (req, res) {
   
    res.send('Hello there!')
});

router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})

let person=[{
    name:"pk",
    age:30,
    votingStatus:false
},

{
    name:"pk",
    age:15,
    votingStatus:false
},
{
    name:"pk",
    age:55,
    votingStatus:false
},
{
    name:"jk",
    age:23,
    votingStatus:false
},
{
    name:"kr",
    age:20,
    votingStatus:false
},
{
    name:"mn",
    age:10,
    votingStatus:false
}]
router.get('/Voting', function(req,res){
        let data=req.query.inputage;
        for(let i=0; i<person.length; i++){
        let personAge=person[i].age
        if( personAge>data||personAge>18){
            person[i].votingStatus=true;
            res.send({personAge})
        }else{
            res.send("age is to low")
        }

}})

module.exports = router;
// adding this comment for no reason