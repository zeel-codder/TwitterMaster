import mongoose from 'mongoose';

// console.log(process.env.mongodb_url)


const ConnectToDataBase=async ()=>{
    // console.log('Start Connections')
     await mongoose.connect(process.env.mongodb_url || '');
      
    //  console.log('Loading Connections');
     mongoose.connection
      .once('open',()=>console.log('connect data base'))
      .on('error',(error)=>console.log(error,123));
}


ConnectToDataBase();

import './Schema'
