import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function AdminController() {
  
  const [user,setUser] = useState({});
  useEffect(()=>{
    let user = JSON.parse(sessionStorage.getItem('admin-info'));
    setUser(user)
  },[])
 

  const navigate = useNavigate();
    return (
      <div>
        <br/><br/>
        <h1>Welcome {user.name}</h1><br/><br/><br/><br/>

        <button onClick={()=>{navigate("/admin/customerlist")}}>Customer List</button>{'    '}&nbsp;
        <button onClick={()=>{navigate("/admin/driverlist")}}>Driver List</button>{'    '}&nbsp;
        <button
          title="Approve or reject new drivers. Only authorized drivers can add rides."
          onClick={()=>{navigate("/admin/newdriverlist")}}
        >
          Authenticate New Drivers
        </button>{'    '}&nbsp;
        <button onClick={()=>{navigate("/admin/paymentstable")}}>Payments Table</button>
        {/* Only drivers authorized here can add rides */}
      </div>
    )
  
}
