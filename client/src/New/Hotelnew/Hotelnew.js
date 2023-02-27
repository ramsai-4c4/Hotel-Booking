import "./Hotelnew.css";
import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Hotelnew = () => {
    const [info,setInfo]=useState({})
    const handlechange=(e)=>{
        setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
        
    }
    const navigate=useNavigate()
    const handlesubmit=async ()=>{
        console.log(info)
        if(!info.name || !info.type || !info.city || !info.address || !info.desc || !info.cheapestPrice || !info.rating){
            alert("Enter The Required Details")
        }
        try{
            const response=await axios.post("http://localhost:8000/hotel",{...info,rating:Number(info.rating),cheapestPrice:Number(info.cheapestPrice)})
            navigate("/admin/hotels")
            
        }
        catch(err){
            console.log(err)
        }

    }
  return (
    <div className="Hotel-adding">
        <div className="Hotel-title">Add New Hotel</div>
        <div className="Hotelnew">
        <div className="Hotelnew-left">
            <input type="text" className="Hotelnew-input" id="name" placeholder="Enter The Hotel Name" onChange={handlechange}/>
            <input type="text" className="Hotelnew-input" id="type" placeholder="Enter The Hotel Type" onChange={handlechange}/>
            <input type="text" className="Hotelnew-input" id="city" placeholder="Enter The Hotel City" onChange={handlechange}/>
            <input type="text" className="Hotelnew-input" id="address" placeholder="Enter The Hotel Address" onChange={handlechange}/>
        </div>
        <div className="Hotelnew-right">
            <input type="text" className="Hotelnew-input" id="desc" placeholder="Enter The Hotel Description" onChange={handlechange}/>
            <input type="number" className="Hotelnew-input" id="rating" placeholder="Enter The Hotel Rating" onChange={handlechange}/>
            <input type="number" className="Hotelnew-input" id="cheapestPrice" placeholder="Enter The Hotel CheapestPrice" onChange={handlechange}/>
            <button onClick={handlesubmit} className="hotel-newbtn">Submit</button>
        </div>

    </div>
    </div>
  )
}

export default Hotelnew