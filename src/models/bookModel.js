const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {type:String, 
        require:true},
    authorName: String,
    year:Number, 
       
    tags: [String],
     isPublished: Boolean,
     stockAvailable:Boolean,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    sales: {type: Number, default: 10},
    pages:Number,
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //books

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
