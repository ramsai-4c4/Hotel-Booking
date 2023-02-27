const express=require("express")
const authroute=express.Router()
const {httpAddNewUser,httpLogin}=require("./auth")
authroute.post("/register",httpAddNewUser)
authroute.post("/login",httpLogin)
module.exports=authroute;