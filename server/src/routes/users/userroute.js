const express=require("express")
const userRoute=express.Router()
const {httpGetUsers,httpUpdateUser,httpDeleteUser}=require("./users")
const {verifyUser,verifyAdmin}=require("../../utils/verify")
userRoute.get("/",httpGetUsers)
userRoute.put("/:id",verifyUser,httpUpdateUser)
userRoute.delete("/:id",httpDeleteUser)
module.exports=userRoute