const {getHotels,addNewHotel}=require("../../models/hotels/hotelmodel")
const hotels=require("../../models/hotels/hotelsDb")
const rooms=require("./../../models/rooms/roomDb")
async function httpGetAllHotels(req,res){
    const {min,max,...others}=req.query
    console.log({...others})
    console.log(max,min)
    res.status(200).json(await getHotels({...others,cheapestPrice:{ $gt:min ||1 , $lte:max ||1001}}))
}
async function httpGetAll(req,res){
    const allhotels=await hotels.find({})
    res.status(200).json(allhotels)
}
async function httpGetHotelRooms(req,res,next){
    const hotelid=req.params.id
    try{
        const hotel=await hotels.findById(hotelid)
        const list=await Promise.all(hotel.rooms.map((room)=>{
            return rooms.findById(room)
        }))
        res.status(200).json(list)

    }
    catch(err){
        next(err)
    }
}
async function httpGetHotelById(req,res){
    const id=req.params.id
    const hotel=await hotels.findOne({_id:id})
    console.log(hotel)
    if(hotel){
        res.status(200).json(hotel)
    }
    else{
        res.status(400).json({
            error:"Hotel Not Found"
        })
    }
}
async function httpUpdateHotel(req,res){

}
async function httpDeleteHotel(req,res){
    const hotelid=req.params.id;
    console.log(hotelid)
    try{
        await hotels.findByIdAndDelete(hotelid)
        res.status(200).send("Hotel Has Been Deleted")
    }
    catch(err){
        next(err)
    }


}
async function httpGetCountByType(req,res){
    try{
        const hotelCount=await hotels.countDocuments({type:"hotel"})
        const resortCount=await hotels.countDocuments({type:"Resort"})
        const apartCount=await hotels.countDocuments({type:"appartment"})
        const villaCount=await hotels.countDocuments({type:"villa"})
        const cabinCount=await hotels.countDocuments({type:"cabins"})

        res.status(200).json([
            {type:"hotels",count:hotelCount},
            {type:"appartments",count:apartCount},
            {type:"resorts",count:resortCount},
            {type:"villas",count:villaCount},
            {type:"cabins",count:cabinCount}
        ])
    }
    catch(err){
        res.status(400).json({
            error:"Something is Fhy"
        })
    }

}
async function httpGetCountByCity(req,res){
    const cities=req.query.cities.split(",")
    console.log(cities)
    if(cities){
        const list=await Promise.all(cities.map(city=>{
            return hotels.countDocuments({city:city})
        }))
        return res.status(200).json(list)
    }
    res.status(400).json({error:"Something is fishy"})


}
async function httpAddNewHotel(req,res){
    const hotel=req.body
    console.log(hotel)
    if(hotel){
        await addNewHotel(hotel)
        res.status(200).json(hotel)
    }
    else{
        res.status(400).json({
            error:"Something Is Missing"
        })
    }

}
module.exports={
    httpGetAllHotels,
    httpAddNewHotel,
    httpUpdateHotel,
    httpDeleteHotel,
    httpGetCountByCity,
    httpGetCountByType,
    httpGetHotelById,
    httpGetHotelRooms,
    httpGetAll
}