import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Form,Button } from 'react-bootstrap'
import './style/dlogin.css';
import ReCAPTCHA from 'react-google-recaptcha';


function DriverLogin() {

  const [email,setEmail]=useState('');
  const [pwd,setPassword]=useState('');
  const navigate= useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem('driver-info')){
      navigate("/driver/controller")
    }
  })

  const [verified,setVerified]=useState(false); 
   function onChange(value){
        console.log("Captcha value:",value);
        setVerified(true);
    }


    const handleEmail = (e) => {
      setEmail(e.target.value);
      setSubmitted(false);
    };
  
    const handlePassword = (e)=>{
      setPassword(e.target.value);
      setSubmitted(false);
    }
  
      // Showing success message
      const successMessage = () => {
          return (
            <div
              className="success"
              style={{
                display: submitted ? '' : 'none',
              }}>
             
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

    async function login(e){
      e.preventDefault();
      if (email === '' || pwd === '') {
        setError(true);
      }
      else{
      
      let item={email,pwd};
      let result = await fetch("http://localhost:8080/driver/login",{
          method:'POST' ,
          headers:{
            "Content-Type":"application/json",
              "Accept":'application/json'
          },
          body:JSON.stringify(item)
      });
      result = await result.json();
      sessionStorage.setItem("driver-info",JSON.stringify(result))
      navigate("/driver/controller")
    }
  }


  return (
    <div className="cont">
       <div className='form-container sign-in-container'>
      <h1>Driver Login</h1>
         <form>

         <div className="messages">
               
               {errorMessage()}
               {successMessage()}
              
           </div>
 
            <input
              type="email"
              placeholder="Email (e.g., user@example.com)"
              onChange={handleEmail}
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              title="Please enter a valid email address"
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              onChange={handlePassword}
              required
              minLength={6}
            />
            <button onClick={login} >Login</button>
          

    
    </form>
    
    </div>
    <div className="overlay-container">
		<div className="overlay">
		
			<div className="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button className="ghost" id="signUp"  onClick={()=>{navigate('/driver/register')}}>Sign Up</button>
			</div>
		</div>
	</div>
    </div>
  )
}

export default DriverLogin