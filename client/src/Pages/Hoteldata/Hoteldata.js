import React from 'react'
import useFetch from "../../hooks/useFetch";
import { useEffect,useState} from 'react';
import "./Hoteldata.css";
import axios from "axios";
function Hoteldata() {
    const {data,loading,error}=useFetch("http://localhost:8000/hotel/all")
    console.log(data)
    const [list, setList] = useState([]);
    useEffect(() => {
      setList(data);
    }, [data]);
    const handleclick=async (id)=>{
      console.log(id)
      try{
        await axios.delete(`http://localhost:8000/hotel/${id}`)
        setList(list.filter((item)=>item._id!==id))
      }
      catch(err){

      }

    }
    const tablebody=list?.map((item)=>{
        return <tr key={item._id}>
            <td style={{textAlign:"center"}}>{item._id}</td>
            <td style={{textAlign:"center"}}>{item.name}</td>
            <td style={{textAlign:"center"}}>{item.city}</td>
            <td style={{textAlign:"center"}}>{item.type}</td>
            <td style={{textAlign:"center"}}>{item.rating}</td>
            <td style={{textAlign:"center"}}><button className="btn btn-danger" onClick={()=>handleclick(item._id)}>Remove</button></td>

        </tr>
    })
  return (
    <div className='Users'>
        <div className="Users-header">
            <span className="users-span">All The Hotels</span>
            <button className="users-button">Add Hotel</button>
        </div>
        <div className="Users-data">
          {loading?"Loading":<>
          <table className="table table-bordered">
            <thead >
              <tr style={{textAlign:"center"}}>
                <th>Id</th>
                <th>Name</th>
                <th>City</th>
                <th>Type</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {tablebody}
            </tbody>
          </table>
          </>}
            
        </div>
    </div>
  )
}

export default Hoteldata