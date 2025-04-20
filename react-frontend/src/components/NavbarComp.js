import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import './home.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";

function NavbarComp() {
  const [user1, setUser] = useState();
  const [expanded, setExpanded] = useState(false);
  
  useEffect(() => {
    let user1 = JSON.parse(sessionStorage.getItem('user'));
    setUser(user1);
  }, []);
  
  const navigate = useNavigate();
  
  function logOut() {
    sessionStorage.clear();
    navigate("/");
    setExpanded(false);
  }
  
  return (
    <div>
      <div className="grad-bar"></div>
      <Navbar 
        bg="light" 
        variant="light" 
        className='navb' 
        expand="lg"
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Container className='navbar'>
          <Navbar.Brand as={Link} to={"/"} onClick={() => setExpanded(false)} className="logo">
            <img 
              src={require("./jmr.png")} 
              style={{height: "85px"}} 
              alt="JMR Logo"
            />
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/"} onClick={() => setExpanded(false)}>Home</Nav.Link>
              <Nav.Link as={Link} to={"/about-us"} onClick={() => setExpanded(false)}>About Us</Nav.Link>
              <Nav.Link as={Link} to={"/team"} onClick={() => setExpanded(false)}>Team</Nav.Link>
              <Nav.Link as={Link} to={"/career"} onClick={() => setExpanded(false)}>Career</Nav.Link>
              <Nav.Link as={Link} to={"/contact-us"} onClick={() => setExpanded(false)}>Contact Us</Nav.Link>
              
              <Button 
                className="admin-btn d-lg-block"
                style={{position: "absolute", right: "10px"}}
                as={Link} 
                to={"/admin/login"}
                onClick={() => setExpanded(false)}
              >
                Admin Login
              </Button>
            </Nav>
            
            {sessionStorage.getItem('user') ?
              <Nav className="user-dropdown">
                <NavDropdown 
                  title={user1 && user1.name} 
                  id="user-dropdown"
                >
                  <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              : null
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComp;

