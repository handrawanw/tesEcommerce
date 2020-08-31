let jwt=require("jsonwebtoken");
let SECRET_KEY="TUYUL_TROYA";

class AuthJWT {

    buatToken(req,res){
    "use strict";
        try {
            let {email}=req.body;
            let token=jwt.sign({
                    data:email,
                },SECRET_KEY,{
                    expiresIn:3600000
                });
            res.status(200).json({
                message:"Login Sukses",
                httpCode:200,
                token,
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