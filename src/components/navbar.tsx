import React from 'react'
import { Link } from 'react-router-dom'
import {auth} from '../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth'
import '../style/Navbar.css';
import {useNavigate} from 'react-router-dom'

export function Navbar() {
const [user] = useAuthState(auth);
const navigate = useNavigate();

const userSignOut = async()=>{
    try{
        await signOut(auth);
        navigate("/");
    }catch{
        console.log("error when sign out try again")
    }
    
    
}

  return (
    <div>
        <div className='nav-bar'>
            <div className='nav-link'>
                <Link to={"/"}>Home</Link>
                {!user ? <Link to={"/login"}>Login</Link>: <Link to={"/createpost"}>CreatePost</Link>}
            </div>
            
            {
                user && 
                <>
                <div className='user-profile'>
                    <p className='usser-name'>{user?.displayName}</p>
                    <img src={user?.photoURL || ""}  width={"50px"} className='profile-pic'/>
                    <button onClick={userSignOut} className='logout-button'>Log out</button>

                </div>
                    
                </>
            }

        </div>
        
       
        

        
    </div>
  )
}
