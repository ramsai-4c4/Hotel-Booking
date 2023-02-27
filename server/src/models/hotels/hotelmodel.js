const hotels=require("./hotelsDb")

async function getHotels(query){
    console.log(query)
    return await hotels.find(query)
}
async function addNewHotel(hotel){
    await hotels.create(hotel)
}
module.exports={
    getHotels,
    addNewHotel
}