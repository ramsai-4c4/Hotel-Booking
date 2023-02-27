import React, { Component } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Hotel from "./Components/Hotel/Hotel"
import Singlehotel from './Pages/Singlehotel/Singlehotel';
import { Route,Routes,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Signin from './Pages/Signin/Signin';
import Register from './Components/Register/Register';
import Admin from './Pages/Admin/Admin';
import Userdata from './Data/Userdata/Userdata';
import Hoteldata from './Pages/Hoteldata/Hoteldata';
import Roomdata from './Data/Roomdata/Roomdata';
import Hotelnew from './New/Hotelnew/Hotelnew';
import Roomnew from './New/Roomnew/Roomnew';
const App=()=>{
  const ProtectedRoute = ({ children }) => {
    const user=useSelector((state)=>state.user)

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };
    return <div>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route index element={<Home/>}/>
          <Route path="/hotels" element={<Hotel/>}/>
          <Route path="/hotels/:id" element={<Singlehotel/>}/>
          <Route path="/login" element={<Signin/>}/>
          <Route path="/register" element={<Register/>}/>
        </Route>
        <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>}>
          <Route index element={<ProtectedRoute><Userdata/></ProtectedRoute>}/>
          <Route path="/admin/hotels" element={<ProtectedRoute><Hoteldata/></ProtectedRoute>}/>
          <Route path="/admin/rooms" element={<ProtectedRoute><Roomdata/></ProtectedRoute>}/>
          <Route path="/admin/hotelnew" element={<ProtectedRoute><Hotelnew/></ProtectedRoute>}/>
          <Route path="/admin/roomnew" element={<ProtectedRoute><Roomnew/></ProtectedRoute>}/>
        </Route>
      </Routes>
    </div>
  }

export default App;