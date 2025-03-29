import React, { useState,useEffect } from 'react';
import  {Navbar,Nav,Container,Button, NavDropdown} from 'react-bootstrap';
import './home.css'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";




function NavbarComp() {
 

  const [user1,setUser] = useState();

  useEffect(()=>{
    let user1 =JSON.parse (sessionStorage.getItem('user'));
    setUser(user1);
   
},[])

  const navigate = useNavigate()
  

  function logOut(){
    sessionStorage.clear();
    navigate("/")
  }

    return (
      
      <div  >
         <div className="grad-bar"></div>
        <Navbar bg="light" variant="light" className='navb'>
        <Container className='navbar' >
          <Navbar.Brand as={Link} to={"/"}><img src={require("./jmr.png")} style={{height: "85px"}}  ></img></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"} >Home</Nav.Link>
            <Nav.Link as={Link} to={"/about-us"}>About Us</Nav.Link>
            <Nav.Link as={Link} to={"/team"}>Team</Nav.Link>
            <Nav.Link as={Link} to={"/career"}>Career</Nav.Link>
            <Nav.Link as={Link} to={"/contact-us"}>Contact Us</Nav.Link>
            
            <Button  style={{position:"absolute",right:"10px"}}as={Link} to={"/admin/login"}>Admin Login</Button>
            
            </Nav>
            {sessionStorage.getItem('user')?
            <Nav>
              <NavDropdown title={user1 && user1.name}>
                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            :null
            }
        </Container>
      </Navbar>
      </div>
      
    )
  
}

export default NavbarComp;