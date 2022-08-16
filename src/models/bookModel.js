const mongoose=require("mongoose");

const bookSchema=new mongoose.Schema({
    bookName:{
        type:String,
        require:Boolean},
     authorName:String,
    category :String,
     year:Number,
},{timetamps:true});
module.exports= mongoose.model('book',bookSchema)