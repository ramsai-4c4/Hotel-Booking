const express=require("express")
const roomRoute=express.Router()
const {httpAddNewRoom,httpGetAllRooms,httpUpdateAvlbl,httpDeleteRoom}=require("./rooms")
roomRoute.get("/",httpGetAllRooms)
roomRoute.post("/:id",httpAddNewRoom)
roomRoute.put("/availability/:id",httpUpdateAvlbl)
roomRoute.delete("/:id",httpDeleteRoom)
module.exports=roomRoute