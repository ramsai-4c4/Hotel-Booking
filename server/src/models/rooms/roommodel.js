const roomDb=require("./roomDb")
const hotel=require("../hotels/hotelsDb")
async function getAllRooms(){
    return await roomDb.find({})
}
async function addNewRoom(newroom,hotelid){
    const newone=new roomDb(newroom)
    const saveroom=await newone.save()
    await hotel.findByIdAndUpdate(hotelid,{
        $push:{rooms:saveroom._id}
    })
    return saveroom
}
module.exports={
    getAllRooms,
    addNewRoom
}