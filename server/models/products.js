const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let productSchema = new Schema({

    name:{
        type: String,
        required: [true,'Name is required']
    },
    price:{
        type: Number,
        required:[true,'Price is required']
    },
    quantity:{
        type: Number,
        required:[true,'Quantity is required']
    },
    detail:{
        type: String,
        required: [true,'Detail is required ']
    },
    imgUrl:{
        type: String,
        required:[true,'Img is required']
    },
    status:{
        type:Boolean,
        default: true
    }

});

productSchema.plugin(uniqueValidator,{message:'{PATH} Value should be unique '});

module.exports = mongoose.model('Product', productSchema);