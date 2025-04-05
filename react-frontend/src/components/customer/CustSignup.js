

import { useState } from 'react';
import axios from 'axios'   
import './styles/login.css';
import { json, useNavigate } from 'react-router-dom';
 

export default function CustSignup() {

  let navigate = useNavigate();
 
  // States for registration
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPassword] = useState('');
  const [adhar, setAadhar] = useState();
  const role = "CUSTOMER";

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
 
  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
  const handleMobile = (e)=>{
    setMobile(e.target.value);
    setSubmitted(false);
  }
 
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleAadhar = (e)=>{
    setAadhar(e.target.value);
    setSubmitted(false);
  }


 
  // Handling the form submission
const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || mobile===''||  email === '' || pwd === '' || adhar ==='') {
      setError(true);
    } else {
        axios.post('http://localhost:8080/user/register/',{
            name,
            email,
            mobile,
            adhar,
            pwd,            
            role
        }).then(res=>alert(res.data)).catch(err=> console.log(err))
      setSubmitted(true);
      setError(false);
      
    }
  };


 
  // Showing success message
  const successMessage = () => {
    
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
          {/* alert(`Customer ${name} successfully registered!!`) */}
        {/* <h5>Customer {name} successfully registered!!</h5> */}
      </div>
    );
  };
 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h5>Please enter all the fields</h5>
      </div>
    );
  };
 
  return (
    <div className="cont">
     
 
      {/* Calling to the methods */}
   
      <div className='form-container sign-up-container'>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit} >
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
    <table>
      
        {/* Labels and inputs for form data */}
        <tr>
           
        <td>
        <input onChange={handleName} className="input"
          value={name} type="text" placeholder='Name'/> 
        </td>
        </tr>

        <tr>
           
       
        <td> <input onChange={handleMobile} className="input"
          value={mobile} type="number"  placeholder='Mobile Number'  /> 
        </td>
        </tr>

        <tr>
           
        <td>
        <input onChange={handleEmail} className="input"
          value={email} type="email" placeholder='Email' /> 
          </td>
        </tr>
        
        <tr>
           
        <td>
        <input onChange={handlePassword} className="input"
          value={pwd} type="password" placeholder='Password' /> 
          </td>
        </tr>

        <tr> 
         
        <td>
        <input onChange={handleAadhar} className="input"
          value={adhar} type="number" placeholder='Aadhar Number'/> 
          </td>
        </tr>

       
        <br/>
        <tr>
            <td>
        <button  type="submit">
          Submit
        </button>
        </td>
        </tr>
        
        </table>
        </form>
        </div>
        <div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-right">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button class="ghost" id="signIn" onClick={()=>{navigate('/customer/login')}}>Sign In</button>
			</div>
			
		</div>
	</div>
      
    </div>
  );
}