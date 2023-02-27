import { useState,useEffect } from "react";
import axios from "axios"
import useFetch from "../../hooks/useFetch";
import "./Userdata.css"
const Userdata = () => {
    
    const {data,loading,error}=useFetch("http://localhost:8000/users")
    const [list, setList] = useState([]);
    useEffect(() => {
      setList(data);
    }, [data]);
    const handleclick=async (id)=>{
      console.log(id)
      try{
        await axios.delete(`http://localhost:8000/users/${id}`)
        setList(list.filter((item)=>item._id!==id))
      }
      catch(err){

      }

    }
    console.log(data)
    const tbody=list?.map((item)=>{
      console.log(item.admin)
      return <tr key={item._id}>
        <td style={{textAlign:"center"}}>{item._id}</td>
        <td style={{textAlign:"center"}}>{item.email}</td>

        <td style={{textAlign:"center"}}>{item.username}</td>
        <td style={{textAlign:"center"}}>{item.admin?"Admin":"User"}</td>
        <td style={{textAlign:"center"}}><button onClick={()=>handleclick(item._id)} className="btn btn-danger">Remove</button></td>

      </tr>
    })
  return (
    <div className='Users'>
        <div className="Users-header">
            <span className="users-span">All The Users</span>
            <button className="users-button">Add User</button>
        </div>
        <div className="Users-data">
          <table className="table table-bordered">
            <thead >
              <tr style={{textAlign:"center"}}>
                <th>Id</th>
                <th>Email</th>
                <th>Username</th>
                <th>Admin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {tbody}
            </tbody>
          </table>
            
        </div>
    </div>
  )
}

export default Userdata