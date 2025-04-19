

import { useState } from 'react';
import axios from 'axios'   

 
export default function CustSignup() {
 
  // States for registration
  const [cname, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const [email, setEmail] = useState('');
  const [pwd, setPassword] = useState('');
  const [aadhar, setAadhar] = useState('');
 
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
    if (cname === '' || mobile===''||  email === '' || pwd === '' || aadhar ==='') {
      setError(true);
    } else {
        axios.post('http://192.168.1.10:8080/customer/register/',{
            cname,
            mobile,
            email,
            pwd,
            aadhar

        }).then(res=>console.log('posting data',res)).catch(err=> console.log(err))
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
        <h1>Customer {cname} successfully registered!!</h1>
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
        <h1>Please enter all the fields</h1>
      </div>
    );
  };
 
  return (
    <div >
      <div>
        <h1>Customer Registration</h1>
      </div>
 
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
      <div className='form-container'>
      <form onSubmit={handleSubmit}>
    <table>
      
        {/* Labels and inputs for form data */}
        <tr>
            <td>
        <label className="label">Name</label>
        </td>
        <td>
        <input onChange={handleName} className="input"
          value={cname} type="text" /> 
        </td>
        </tr>

        <tr>
            <td>
        <label className="label">Mobile Number</label> 
            </td>
       
        <td> <input onChange={handleMobile} className="input"
          value={mobile} type="number"    /> 
        </td>
        </tr>

        <tr>
            <td>
        <label className="label">Email</label>
        </td>
        <td>
        <input onChange={handleEmail} className="input"
          value={email} type="email" /> 
          </td>
        </tr>
        
        <tr>
            <td>
        <label className="label">Password</label>
        </td>
        <td>
        <input onChange={handlePassword} className="input"
          value={pwd} type="password" /> 
          </td>
        </tr>

        <tr> 
            <td>
        <label className="label">Aadhar Number</label>
        </td>
        <td>
        <input onChange={handleAadhar} className="input"
          value={aadhar} type="number" /> 
          </td>
        </tr>
        <br/>
        <tr>
            <td>
        <button className="btn" type="submit">
          Submit
        </button>
        </td>
        </tr>
        
        </table>
        </form>
        </div>
      
    </div>
  );
}