import React from 'react';
import "./Admin.css"
import Adminnavbar from '../Adminnavbar/Adminnavbar';
import { Link,Outlet } from 'react-router-dom';
const Admin = () => {
  return (
   <>
     <div className='Admin-main'>
        <div className='Admin-count'>
        <div className='Admin-title'>HotelBooking</div>
        <Adminnavbar/>
    </div>
    <div class="Admin-links">
      <Link className='Admin-route' to="/admin">Users</Link>
      <Link className='Admin-route' to="/admin/hotels">Hotels</Link>
      <Link className='Admin-route' to="/admin/rooms">Rooms</Link>
      <Link className='Admin-route' to="/register">Add User</Link>
      <Link className='Admin-route' to="/admin/hotelnew">Add Hotel</Link>
      <Link className='Admin-route' to="/admin/roomnew">Add Room</Link>
    </div>

    </div>
    <Outlet/>
   </>
  )
}

export default Admin;