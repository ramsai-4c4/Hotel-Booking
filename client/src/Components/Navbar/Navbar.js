import {useSelector} from "react-redux"
import "./Navbar.css"
import { Outlet,Link } from 'react-router-dom';
const Navbar=()=>{
    const user=useSelector((state)=>state.user)
    console.log(user)
        return <>
            <div className='navbar'>
            <div className='navbar-container'>
                <span className='project-logo'><Link style={{
                    color:"white",
                    textDecoration:"none"
                }} to="/">HotelBooking</Link></span>
                <div className='navbar-buttons'>
                    {user?<><b style={{textTransform:"capitalize",marginRight:"15px"}}>{user.username.substr(0,6)}</b></>:<>
                        <Link to="/register"><button>Register</button></Link>
                    <Link to="/login"><button>Login</button></Link>
                    </>}
                    {user?.admin && <Link to="/admin"><button>Admin</button></Link>}
                </div>
            </div>

        </div>
        <Outlet/>
        </>
    
}
export default Navbar;