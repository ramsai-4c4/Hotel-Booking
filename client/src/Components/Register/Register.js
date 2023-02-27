import { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./Register.css"
const Register = () => {
    const [credentials,setCredenetials]=useState({username:"",password:"",email:""})
    const [error,setError]=useState(undefined)
    const handlechange=(e)=>{
        setCredenetials(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const navigate=useNavigate()
    const handlesubmit=async(e)=>{
        e.preventDefault();
        console.log(credentials)
        setError(undefined)
        console.log(error)
        try{
            const response=await axios.post("http://localhost:8000/auth/register",credentials);
            navigate("/")
        
        }
        catch(err){
            console.log(err)
            setError(err.response.data.message)
            console.log(error)
            
            

        }

    }
  return <div className="login">
    <div className="lContainer">
        <input type="text" placeholder="username" onChange={handlechange} name="username" className="lInput"/>
        <input type="email" placeholder="email" onChange={handlechange} name="email" className="lInput"/>
        <input type="password" placeholder="password" onChange={handlechange} name="password" className="lInput"/>
         {error && <span style={{
            color:"red"
        }}>{error}</span>} 
        <button className="lButton" onClick={handlesubmit}>Register</button>
    </div>
  </div>
  
}

export default Register;
