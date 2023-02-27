const {getUsers,update}=require("../../models/users/usermodel")
const user=require("../../models/users/userDb")
async function httpGetUsers(req,res){
    res.status(200).json(await getUsers())
}
async function httpUpdateUser(req,res){
    const id =req.params.id
    const newname=req.body.username
    const exists=await user.findById(id)
    if(!exists){
        res.status(400).json({error:"Invalid occur of update"})
    }
    else{
        await update(id,newname)
    res.status(200).json({
        success:"user update successfully"
    })
    }

   
}
async function httpDeleteUser(req,res,next){
    try{
        await user.findByIdAndDelete(req.params.id)
        res.status(200).send("User has been deleted.");
    }
    catch(err){
        next(err)
    }
}
module.exports={
    httpGetUsers,
    httpUpdateUser,
    httpDeleteUser
}