
//import client from "../models/client"
const client =  require("../models/client");
const agencyDb = require("../../agency/models/agency");
const {generateToken} = require("../../../middleware/jwt.token"); 

const jwt =  require('jsonwebtoken');
const { Mongoose, default: mongoose } = require("mongoose");
 async function createClient(data,agency){
     data.forEach(async element => {
        var id = new mongoose.Types.ObjectId();
        let data = {
            time: Date(),
            user_id: id,
            user_type_id: "client",
          };
          jwtSecretKey = "radicle-job-app-super-user-token";
     var token = jwt.sign(data,jwtSecretKey);
    console.log(token);
    var dataRecived =   await  new client({
        _id:id,
        name: element?.name,
        address_1:element?.address_1,
        agency:agency,
        email:element?.email,
        address_2:element?.address_2,
        city:element?.city,
        phone_number:element?.phone_number,
        total_bill:element?.total_bill,
        token: token
    })?.save()?.catch(error =>{
    return error;
   });
        console.log(dataRecived,`client`);
   await agencyDb.findByIdAndUpdate({_id:agency},{
    $push:{
        clients:dataRecived._id
    }
   })
          
     });
    

   if(dataRecived instanceof Error){
    return ({
        'status':0,
        'message':'Failed to send test list!',
        'error': error,
        "data":[]
    })
   }
   return  ({
    'status':1,
    'message':'Failed to send test list!',
    'error': error,
    "data":dataRecived
})
}



async function updateClient(data,id){
     var clientDataObject = {};
     var flag = false;
     if(data?.name){
       clientDataObject["name"] = data.name;
       flag = true;
     }

       if(data?.address_1){
          clientDataObject["address_1"] = data.address_1;
         flag = true;
        }

          if(data?.address_2){
           clientDataObject["address_2"] = data.address_2;
           flag = true;  
        }

           if(data?.city){
            clientDataObject["city" ]= data.city;
           flag = true;   
        }
        if(data?.phone_number){
         clientDataObject["phone_number"] = data.phone_number;
          flag = true;
        }
        if(data?.total_bill){
            clientDataObject["total_bill"] = data.total_bill;
            flag = true;
        }
        console.log(clientDataObject);
       if(flag)
       return  await client.findByIdAndUpdate({_id:id},{$set:clientDataObject}).then(resp=>{
            console.log(resp,`bldfdfk`);
           if(resp){
                  return ({
                    'status':1,
                    'message':'updated client successfully!',
                    'error': "",
                    "data":resp
                })
           }
           return ({
            'status':0,
            'message':'Failed to updated client!',
            'error': error,
            "data":{}
        })
        })

}


 async function getClient(){

    const data =  await client.aggregate([
       
        {
            $lookup:
                {
                    from: "agencies",
                    localField: 'client',
                    foreignField: '_id',
                    as: 'agency',
                }
            
        },

        
        {
            $sort:{total_bill:-1}
        },
        {
            $limit:1
        }
    ])?.catch(error=>{
        return error;
    })

    if(data instanceof Error){
        return ({
            'status':0,
            'message':'Failed to send test list!',
            'error': data,
            "data":[]
        })
    }else{
        return ({
            'status':1,
            'message':'Failed to send test list!',
            'error': "",
            "data":data
        })
    }

}




 async function getClientById(id){
   try{
    console.log(`checking`);
    return await client.aggregate([
        {
            $match:{ _id:new Mongoose.Types.ObjectId(id)}
        },
        
    ]);
}catch(error){
    console.log(error);
    return [];
}

}


module.exports = {
    getClient,createClient,getClientById,updateClient
}
