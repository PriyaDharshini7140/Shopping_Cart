const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LineSchema = new Schema({
       price:{
            type:String,
            required:true
        },
        quantity:{
            type:String,
            required:true
        },
        tax_lines:{
            type:Array,
            price:{
            type:String,
            required:true
        },
        rate:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        }
    }
   
});
const customerSchema = new Schema({
     created_at:{
        type:Date,
        default:Date.now()
    },
    customer_id:{
        type:String,
        required:true
    },
    Line_items:{
        type:[LineSchema],
        default:[]
    }
    });
module.exports = Customer = mongoose.model('customers',customerSchema);