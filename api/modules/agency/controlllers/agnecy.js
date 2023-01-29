const  agency  =  require("../models/agency");


const { createClient } = require("../../client/controllers/client");
const mongoose  = require("mongoose");
 async function crateAgencyAndClient(data){
     try{
          console.log(data,`shivam`);
              
            return   await  new agency({
                   _id:new mongoose.Types.ObjectId(),
                   name: data?.name,
                   address_1:data?.address_1,
                   address_2:data?.address_2,
                   city:data?.city,
                   phone_number:data?.phone_number,
               })?.save()?.then(async agencyDbData=>{

                console.log(agencyDbData,`check1`);
                      if(agencyDbData && data?.clients){
                         console.log(agencyDbData,`check`);
                                await createClient(data?.clients,agencyDbData._id)?.then(async resp=>{
                                    console.log(resp);
                                    return ({
                                        'status':1,
                                        'message':'Failed to send test list!',
                                        'error': "",
                                        "data": await getAgnecyById(agencyDbData?._id)
                                    })
                                })?.catch(error =>{
                                    return ({
                                         'status':0,
                                         'message':'Failed to send test list!',
                                         'error': error,
                                         "data":[]
                                     })
                                   });
                       }

                     
                      return ({
                        'status':1,
                        'message':'Failed to send test list!',
                        'error': "",
                        "data": await getAgnecyById(agencyDbData?._id)
                    })
               })?.catch(error =>{
                 console.log(error);
               return ({
                    'status':0,
                    'message':' to send test list!',
                    'error': error,
                    "data":[]
                })
              });
            

             

         
     }catch(error){
         return error;
     }
           
}



 async function getAgnecyById(id){

    await agency.aggregate([
        {
            $match:{_id: new mongoose.Types.ObjectId(id)}
        },
        {
            $lookup:
                {
                    from: "clients",
                    localField: 'clients',
                    foreignField: '_id',
                    as: 'clients',
                  }
            
        }
    ])
  
    
    return x;

}

module.exports = {
    crateAgencyAndClient,getAgnecyById
}


