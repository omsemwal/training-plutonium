const express = require('express');
const lodash=require('lodash');


const router = express.Router();

let months=["january","february","march","april","may","june","july","august","september","october","november","december"]

let odd=[1,3,5,7,9,11,13,15,17,19,]


let movie=[["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]
]

router.get('/test-me', function (req, res) {

console.log(lodash.chunk(months,3));
console.log(lodash.tail(odd,3))
console.log(lodash.union([1],[1,2],[2,3,4],[1,2,3,4,5,6]))
console.log(lodash.fromPairs(movie))

     res.send('My second ever api!')
   
});






router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason