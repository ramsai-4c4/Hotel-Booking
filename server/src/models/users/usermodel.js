const userbooking=require("./userDb")
async function getUsers(){
    return await userbooking.find({})
}
async function addUser(newuser){
    await userbooking.create(newuser)
}
async function update(id,newname){
    await userbooking.findByIdAndUpdate(id,{
        username:newname
    })
}
module.exports={
    getUsers,
    addUser,
    update
}