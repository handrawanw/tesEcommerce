let mongoose=require("mongoose");

let Schema=mongoose.Schema;

let userModel=new Schema({
    email:{
        type:String,
        required:["Email harus ada !!", true]
    },
    password:{
        type:String,
        required:["Password harus ada !! ",true]
    },
    saldo:{
        type:Number,
        default:100000,
    }
},{
    timestamps:{
        createdAt:"createdAt"
    }
});

let userCollection=mongoose.model("User",userModel);

module.exports=userCollection;