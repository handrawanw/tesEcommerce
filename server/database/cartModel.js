let mongoose=require("mongoose");

let Schema=mongoose.Schema;

let cartModel=new Schema({
    product_name:{
        type:String,
        required:["Nama produk harus ada !! ",true]
    },
    price:{
        type:Number,
        required:["Harga harus ada !! ",true]
    },
    jumlah:{
        type:Number,
        required:["Jumlah harus ada !! ",true]
    },
},{
    timestamps:{
        createdAt:"createdAt"
    }
});

let cartCollection=mongoose.model("Cart",cartModel);

module.exports=cartCollection;