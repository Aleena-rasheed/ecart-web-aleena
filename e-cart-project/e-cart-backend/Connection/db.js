const mongoose =require('mongoose')
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then((res)=>{
    console.log("Mongodb Connection established");
}).catch((err)=>{
    console.log(err);
})