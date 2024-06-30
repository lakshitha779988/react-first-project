import React from 'react'
import {signInWithPopup} from 'firebase/auth'
import {auth , provider} from '../config/firebase'
import {useNavigate} from 'react-router-dom'
import '../style/loging.css'

export function Login() {
    const navigate = useNavigate();

    const signIn = async()=>{
      try{
        const result  = await signInWithPopup(auth,provider);
        console.log(result);
        navigate("/");
      }catch{
        console.log("error wheen sign in pleace try again later")
      }
        
    }
  return (
    <div className='login-container'>
        <p className='signup-text'>Sign up with Google now</p>
        <button onClick={signIn} className='signup-button'>SIgn Up</button>
    </div>
  )
}

