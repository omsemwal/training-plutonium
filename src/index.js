const express=require('express')
const bodyParser = require('body-parser')
const mongoose  = require('mongoose')
const route = require("./routes/route")
const app = express()



app.use(bodyParser.json())
mongoose.set('strictQuery', true)

mongoose.connect("mongodb+srv://16039233:16039233@hariom-semwal.ylnslae.mongodb.net/Hariom-Semwal", {
       useNewUrlParser: true
    })
    .then( () => console.log("MongoDb is connected"))
    .catch ( err => console.log(err) )

    app.use('/', route)
 

app.listen(3000, () => {
  console.log("Running on port 3000.")
})