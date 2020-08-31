let mongoose=require("mongoose");

let Schema=mongoose.Schema;

let cartModel=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
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
    from_product_userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Produk'
    },
    status:{
        type:String,
        default:'none'
    }
},{
    timestamps:{
        createdAt:"createdAt"
    }
});

let cartCollection=mongoose.model("Cart",cartModel);

module.exports=cartCollection;