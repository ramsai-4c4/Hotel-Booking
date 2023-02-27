require("dotenv").config();
const jwt=require("jsonwebtoken")
const {addUser,getUsers}=require("../../models/users/usermodel")
const users=require("../../models/users/userDb")
const bcrypt=require("bcryptjs")
const {createError}=require("../../utils/error")
async function httpAddNewUser(req,res,next){
    const newuser=req.body
    const hashedpassword=await bcrypt.hash(newuser.password,10)
    const already=await users.findOne({email:newuser.email})
    console.log(newuser)
    console.log(already)
    if(already || !newuser){
        console.log("Already")
        return next(createError(400,"User Already Exists"))
    }
    if(newuser){
        await addUser({...newuser,password:hashedpassword})
        res.status(200).json({...newuser,password:hashedpassword})
    }
}
async function httpLogin(req,res,next){
    const data=req.body
    const already=await users.findOne({email:data.username})
    try{
        if(!already){
            return next(createError(400,"User doesn't exist"))
        }
        else{
            const isCorrect=await bcrypt.compare(data.password,already.password)
            if(!isCorrect){
                return next(createError(404,"Wrong Username or password"))
            }
            const token=jwt.sign({id:already._id,admin:already.admin},process.env.ACCESS_TOKEN)
            //console.log(token)
            res.cookie("Naya","Cookie-bro")
            console.log(req.cookies.Naya)
            console.log(req.cookies)
            res.cookie("access_token", token, {
                    httpOnly: true,
                }).status(200).json({...data,admin:already.admin});
        }
    }
    catch(err){
        next(err)
    }
}

module.exports={
    httpAddNewUser,
    httpLogin
}