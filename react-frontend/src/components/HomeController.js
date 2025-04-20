import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileUi from 'react-profile-card';
import axios from 'axios';

export default function HomeController() {
    const navigate = useNavigate();
    


  return (
    <div>
     
    <button onClick={()=>{navigate("/driver/login")}} className='driver'>Driver Login</button>    
    <button onClick={()=>{navigate("/driver/register")}} className='driver'>Driver Signup</button>
    <hr></hr>
    <button onClick={()=>{navigate("/customer/login")}} className='customer'>Customer Login</button>
    <button onClick={()=>{navigate("/customer/register")}} className='customer'>Customer Signup</button>
   
    </div>
   
   
    
  )
}