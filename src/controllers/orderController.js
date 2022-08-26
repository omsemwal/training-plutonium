const { count } = require("console")
const orderModel= require("../models/orderModel")
const productModel = require("../models/productModel")
const usersModel = require("../models/usersModel")

const createOrder= async function (req, res) {
         let data = req.body
         let userId = data.user_id
         let productId=data.product_id
    if(!userId) return res.send({msg:  'userId is mandatory in the request'})
     let wait=await usersModel.findById(userId)
        if(!wait) return res.send({msg:'currect enter id'})


        
    if(!productId) return res.send({msg:  'productId is mandatory in the request'})
       let prodo=await productModel.findById(productId)
          if(!prodo) return res.send({msg:'currect product id'})

    let savedData= await orderModel.create(data)
    res.send({data: savedData})
}

module.exports.createOrder= createOrder
