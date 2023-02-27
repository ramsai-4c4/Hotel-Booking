const express=require("express")
const app=express();
const path=require("path")
const cookieParser=require("cookie-parser")
const userRoute=require("./routes/users/userroute")
const roomRoute=require("./routes/rooms/roomroute")
const hotelRoute=require("./routes/hotels/hotelroute")
const authroute=require("./routes/users/authroute")
app.use(cookieParser())
const cors=require("cors")
app.use(cors({
    origin:"http://localhost:3000",
}))

app.use(express.json())

app.use("/users",userRoute)
app.use("/rooms",roomRoute)
app.use("/hotel",hotelRoute)
app.use("/auth",authroute)
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });
app.use(express.static(path.join(__dirname,"..","public")));
app.get("/*",(req,res)=>{
  res.sendFile(path.join(__dirname,"..","public","index.html"))
})




app.get("/",(req,res)=>{
  console.log(req.cookies)
    res.send("Hello there")
})
app.get("/cookie",(req,res)=>{
  res.cookie("Test","Ram Sai Gopal")
  res.send("hello contact from the server")
})
module.exports=app;