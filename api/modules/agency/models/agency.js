//import {IJob} from './i.jobs';
const  mongoose =  require('mongoose');
//import {DBCollectionName} from '../../../../constant/app.constant';



const agencySchema = new mongoose.Schema({
  
    _id :    mongoose.Types.ObjectId,
     name  : {
        type:String,
        required:true
    },
    address_1:{
        type:String,
        required:true
    },
    address_2 : {
        type:String
    },
    city: {
        type:String,
        required:true
    },
    phone_number: {
        type:String,
        required:true
    },
   clients:[{
    type: mongoose.Types.ObjectId,
    ref:"clients"
   }],
    
  },
  {
    timestamps: true,
  },
);

module.exports =  mongoose.model("agencies", agencySchema);
