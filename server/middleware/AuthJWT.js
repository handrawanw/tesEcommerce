let jwt=require("jsonwebtoken");
let SECRET_KEY="TUYUL_TROYA";

let userCollection=require("../database/userModel");

class AuthJWT {

    buatToken(req,res){
    "use strict";
        try {
            let {email}=req.body;
            userCollection.findOne({email}).then((data)=>{
                let token=jwt.sign({
                    id:data._id,
                },SECRET_KEY,{
                    expiresIn:3600000
                });
                res.status(200).json({
                    message:"Login Sukses",
                    httpCode:200,
                    token,
                });
            }).catch((err)=>{
                res.status(500).json({
                    message:error.message,
                    httpCode:500
                });
            });
        } catch (error) {
            res.status(500).json({
                message:error.message,
                httpCode:500
            });
        }
    }


    verifyToken(req,res,next){
        "use strict";
        let token=req.headers.token;
        try {
            let verifyJWT=jwt.verify(token,SECRET_KEY);
            req.decoded=verifyJWT;
            next();
        } catch (error) {
            res.status(500).json({
                message:error.message,
                httpCode:500
            });
        }
    }

}

module.exports=new AuthJWT;