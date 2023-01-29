//import {IJob} from './i.jobs';
const  mongoose = require('mongoose');
//import {DBCollectionName} from '../../../../constant/app.constant';



const clientSchema = new mongoose.Schema({
    _id:  mongoose.Types.ObjectId, 
    agency: {
        type:mongoose.Types.ObjectId,
        ref:"clients"
    }   ,
    name : {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    },
    total_bill : {
        type:Number,
        required:true
    },
   token:{
    type:String
   }
    
    
  },
  {
    timestamps: true,
  },
);


module.exports =  mongoose.model("clients", clientSchema);
