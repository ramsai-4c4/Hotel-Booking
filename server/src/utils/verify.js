const jwt=require("jsonwebtoken")
const {createError}=require("./error")
const verifyToken=(req,res,next)=>{
    console.log(req.cookies)
    const jwttoken=req.cookies.access_token;
    console.log(jwttoken)
    if(!jwttoken){
        console.log("oops")
        return {status:400,message:"You are not authenticated"}
    }
    
    const status=jwt.verify(jwttoken,process.env.ACCESS_TOKEN,(err,user)=>{
                if(err){

                    return {status:400,message:"Token Is Not Valid"}
                }
                const tokenstatus={status:200,user:user}
                //console.log(tokenstatus)
                return tokenstatus
            })
    return status
}
const verifyUser=(req,res,next)=>{
    const status=verifyToken(req,res,next)
    console.log(status)
    if(tokenstatus.status!==200){
        return next(createError(tokenstatus.status,tokenstatus.message))
    }

    if(req.user.id===req.params.id || req.user.admin){
        next()
    }
    else{
        return next(createError(403, "You are not the authenticated!"))
        
    }

    
};
const verifyAdmin=(req,res,next)=>{
        const tokenstatus=verifyToken(req,res,next)
        console.log(tokenstatus)
        if(tokenstatus.status!==200){
            return next(createError(tokenstatus.status,tokenstatus.message))
        }
        if(tokenstatus.user.admin){
            console.log("deleting")
            next()
        }
        else{
            return next(createError(403, "You are not authorized!"));
        }

    
}
module.exports={
    verifyAdmin,
    verifyUser
}