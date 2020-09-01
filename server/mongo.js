let mongoose=require("mongoose");
let url="mongodb://localhost:27017/marketplace";

mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true,useFindAndModify:false});

let mongo=mongoose.connection;

mongo.on("error",(err)=>{
    console.error(err);
});

mongo.once("open",()=>{
    console.log(`Tersambung mongodb`);
});

module.exports=mongo;