const { count } = require("console")
const orderModel= require("../models/orderModel")
const productModel = require("../models/productModel")
const usersModel = require("../models/usersModel")

const createOrder= async function (req, res) {
         let data = req.body

         let otherData=req.headers["isfreeappuser"]
 
         if(otherData){
            if(otherData=='true')
            req.body.isFreeAppUser='true'
            if(otherData=='false')
            req.body.isFreeAppUser='false'
            
         }else{
            return res.send({msg:'header is require'})
         }
       


         let userId = data.user_id
         let productId=data.product_id
    if(!userId) {return res.send({msg:  'userId is mandatory in the request'})
      }else if(!productId) {return res.send({msg:'productId is mandatory in the request'})
   }
     let current=await usersModel.findById(userId).select({balance:1})
     let prodo=await productModel.findById(productId).select({price:1})

        if(!current){return res.send({msg:'plz enter currect id'})
 }else if(!prodo) {return res.send({msg:'currect product id'})
 }

   if (otherData=="true"){
    data['amount']=0
    otherData="true"
    let savedData= await orderModel.create(data)
     res.send({msg: savedData});

   }else if(current['balance'] >= prodo['price']){

      
      currBalance=current['balance'] - prodo['price']
await usersModel.findOneAndUpdate({_id:data.userId},{$set:{balance:currBalance}},{new:true});
data['amount']=prodo.price
//  console.log({ab})
let savedData= await orderModel.create(data)
res.send({msg: savedData})
     }else{
   res.send ({msg:'balance is not enough'});
}};

module.exports.createOrder= createOrder
