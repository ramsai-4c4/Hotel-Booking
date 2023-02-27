
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import "./Signin.css"
import axios from "axios";
const Signin = () => {
    const [credentials,setCredenetials]=useState({username:"",password:""})
    const handlechange=(e)=>{
        setCredenetials(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const error=useSelector((state)=>state.error)
    console.log(error)
    const handlesubmit=async(e)=>{
        dispatch({type:"LOGIN_START"})
        e.preventDefault();
        try{
            const response= await axios.post("http://localhost:8000/auth/login",credentials);
            dispatch({type:"LOGIN_SUCCESS",payload:response.data})
            navigate("/")
        
        }
        catch(err){
            dispatch({type:"LOGIN_FAILURE",payload:err.response.data})

        }

    }
  return <div className="login">
    <div className="lContainer">
        <input type="text" placeholder="username" onChange={handlechange} name="username" className="lInput"/>
        <input type="password" placeholder="password" onChange={handlechange} name="password" className="lInput"/>
        {error && <span style={{
            color:"red"
        }}>{error.message}</span>}
        <button className="lButton" onClick={handlesubmit}>Login</button>
    </div>
  </div>
  
}

export default Signin
