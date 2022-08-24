const mongoose=require('mongoose')

const publisherSchema=new mongoose.Schema({
    name:String,
   headQuarter: String

},{timetamps:true})
module.exports=mongoose.model("publisher",publisherSchema)