import React ,{useState,useEffect} from "react";
import { useNavigate,Link } from "react-router-dom";
import './styles/login.css';

function CustLogin(){

    const navigate = useNavigate();

const[email,setEmail]= useState('');
const[pwd,setPassword] = useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

useEffect(()=>{
  let user =sessionStorage.getItem('user')
        
           if(user !== null){
             navigate("/customer/controller")
           }
           else{
             
           }

},[])

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

        let item ={email,pwd};
        try {
            let result = await fetch('http://localhost:8080/customer/login/',{
                method:'POST',
                headers :{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body:JSON.stringify(item)

            });

            if (result.status === 200) {
                result = await result.json();
                console.log("Login successful, user data:", result);
                sessionStorage.setItem('user', JSON.stringify(result));
                setSubmitted(true);
                setError(false);
                navigate('/customer/controller');
            } else {
                console.error("Login failed with status:", result.status);
                setError(true);
                alert("Invalid email or password. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again later.");
        }
    }
   }
    return (
        
        <div className="cont">
              <div className='form-container sign-in-container'>
            <h1>Login Page</h1>
           
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
           
            <button  onClick={login}>Login</button>
            </form>
        

<div>
       
           
        </div>
        </div>
        <div class="overlay-container">
		<div class="overlay">
		
			<div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button class="ghost" id="signUp" onClick={()=>{navigate('/customer/signup')}}>Sign Up</button>
			</div>
		</div>
	</div>
        </div>
    )
}

export default CustLogin;