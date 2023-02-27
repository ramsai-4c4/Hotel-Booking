const {getAllRooms,addNewRoom}=require("../../models/rooms/roommodel")
const Room=require("../../models/rooms/roomDb")
async function httpGetAllRooms(req,res){
    res.status(200).json(await getAllRooms())
}
async function httpUpdateAvlbl(req,res,next){
    console.log("coming")
    try {
        await Room.updateOne(
          { "roomNumbers._id": req.params.id },
          {
            $push: {
              "roomNumbers.$.unavailableDates": req.body.dates
            },
          }
        );
        res.status(200).json("Room status has been updated.");
      } catch (err) {
        next(err);
      }
    
}
async function httpDeleteRoom(req,res,next){
  const roomid=req.params.id;
    console.log(roomid)
    try{
        await Room.findByIdAndDelete(roomid)
        res.status(200).send("Hotel Has Been Deleted")
    }
    catch(err){
        next(err)
    }

}
async function httpAddNewRoom(req,res){
    try{
      const newroom=req.body
      console.log(newroom)
      const hotelid=req.params.id
      console.log(hotelid)
      if(newroom){
          const save=await addNewRoom(newroom,hotelid)
          
          return res.status(200).json(save)
      }
      res.status(400).json({
          error:"Unable to Add New Room"
      })
    }
    catch(err){
      next(err)

    }
}
module.exports={
    httpAddNewRoom,
    httpGetAllRooms,
    httpUpdateAvlbl,
    httpDeleteRoom
}