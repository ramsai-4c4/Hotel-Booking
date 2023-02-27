require("dotenv").config();
const http=require("http")
const PORT=8000;
const app=require("./app")
const server=http.createServer(app);
const mongoose=require("mongoose")
const Mongo_URL="mongodb+srv://nasa-api:RrcBiC9zPUiG2lxw@nasacluster.lkrj2um.mongodb.net/nasa?retryWrites=true&w=majority"
mongoose.set("strictQuery",false)
mongoose.connection.once("open",()=>{
    console.log("Mongodb connection is ready")
})
mongoose.connection.on("error",()=>{
    console.log("Connection failed")
})
async function start(){
    await mongoose.connect(Mongo_URL)
    server.listen(PORT,()=>{
        console.log("Listening on port")
    })
}
start();
