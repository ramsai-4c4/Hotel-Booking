import React, { useState } from 'react'
import "./Roomnew.css";
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
const Roomnew = () => {
    const {data,loading,error}=useFetch("http://localhost:8000/hotel")
    const [id, setId] = useState(undefined);
    const [rooms, setRooms] = useState([]);
    const [info,setInfo]=useState({})
    const handlechange=(e)=>{
        setInfo((prev)=>({...prev,[e.target.id]:e.target.value}))
    }
    const handlesubmit=(e)=>{
        e.preventDefault()
        const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
        if(!info.title || !info.price  || !info.maxPeople || !info.price){
            alert("Enter the required Fields")
        }
        console.log(id)
        try{
            axios.post(`http://localhost:8000/rooms/${id}`,{...info,price:Number(info.price),maxPeople:Number(info.maxPeople),roomNumbers})
        }
        catch(err){
            console.log(err)
        }

    }
  return (
    <div className="Hotel-adding">
    <div className="Hotel-title">Add New Room</div>
    <div className="Hotelnew">
    <div className="Hotelnewroom-left">
        <input type="text" className="Hotelnew-input" id="title" placeholder="Enter The Room Title" onChange={handlechange}/>
        <input type="number" className="Hotelnew-input" id="price" placeholder="Enter The Room Price" onChange={handlechange}/>
        <select id="hotelId" onChange={(e)=>{setId(e.target.value)}} className='Hotel-select'>
            <option value="none">Select An Option</option>
            {loading?"loading":data?.map((hotel)=>{
                return  <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
            })}
        </select>
        

    </div>
    <div className="Hotelnew-right">
        <input type="number" className="Hotelnew-input" id="maxPeople" placeholder="Enter Maximum People" onChange={handlechange}/>
        <input type="text" className="Hotelnew-input" id="desc" placeholder="Enter The Room Description" onChange={handlechange}/>
        <textarea className='Text-numbers'
            onChange={(e) => setRooms(e.target.value)}
            placeholder="give comma between:"
        />
        <button onClick={handlesubmit} className="hotel-newbtn">Submit</button>
    </div>

</div>
</div>
  )
}

export default Roomnew;