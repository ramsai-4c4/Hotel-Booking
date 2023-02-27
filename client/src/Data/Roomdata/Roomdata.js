import React from 'react'
import useFetch from '../../hooks/useFetch';
import { useState,useEffect } from 'react';
import axios from "axios";
import "./Roomdata.css"
function Roomdata() {
    const {data,loading,error}=useFetch("http://localhost:8000/rooms")
    const [list, setList] = useState([]);
    useEffect(() => {
      setList(data);
    }, [data]);
    const handleclick=async (id)=>{
      try{
        await axios.delete(`http://localhost:8000/rooms/${id}`)
        setList(list.filter((item)=>item._id!==id))
      }
      catch(err){

      }


    }
    const tabledata=list?.map((item)=>{
        return <tr key={item._id}>
            <td style={{textAlign:"center"}}>{item._id}</td>
            <td style={{textAlign:"center"}}>{item.title}</td>
            <td style={{textAlign:"center"}}>{item.price}</td>
            <td style={{textAlign:"center"}}>{item.maxPeople}</td>
            <td style={{textAlign:"center"}}>{item.desc}</td>
            <td style={{textAlign:"center"}}><button className="btn btn-danger" onClick={()=>handleclick(item._id)}>Remove</button></td>

        </tr>
    })
  return (
    <div className='Users'>
        <div className="Users-header">
            <span className="users-span">All The Rooms</span>
            <button className="users-button">Add Room</button>
        </div>
        <div className="Users-data">
          <table className="table table-bordered">
            <thead >
              <tr style={{textAlign:"center"}}>
                <th>Id</th>
                <th>Title</th>
                <th>Price</th>
                <th>Max People</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {tabledata}
            </tbody>
          </table>
            
        </div>
    </div>
  )
}

export default Roomdata;