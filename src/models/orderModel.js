 const mongoose = require('mongoose');
 const ObjectId = mongoose.Schema.Types.ObjectId
 
 const orderSchema = new mongoose.Schema( {
    user_id:{type:ObjectId,
    ref:'Users'},
	product_id:{type:ObjectId,
        ref:'product'},
	amount: 0,
	isFreeAppUser:{type:Boolean,
                default:false}
}, { timestamps: true });
 module.exports = mongoose.model('order', orderSchema)
