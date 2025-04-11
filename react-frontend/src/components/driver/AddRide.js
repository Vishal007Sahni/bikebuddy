import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRide() {

    //getting state from local storage

    const navigate = useNavigate();

    //states
    const [driver, setDriver] = useState({});
    const [source, setSource] = useState('');
    const [dest, setDest] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const type = "NORMAL";
    const [charges, setCharges] = useState('');

    //error checking
    const [submitted, setSubmitted] = useState('');
    const [error, setError] = useState('');

    const sourceInputRef = useRef(null);
    const destinationInputRef = useRef(null);
    const sourceAutocompleteRef = useRef(null);
    const destinationAutocompleteRef = useRef(null);

    useEffect(() => {
        let driver = JSON.parse(sessionStorage.getItem('driver-info'));
        setDriver(driver);

        // Load Google Maps JavaScript API script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCAI_95oRUs7Pp8woFcyy3bkXpQ882Zt4Y&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initAutocomplete;
        document.head.appendChild(script);

        return () => {
            // Cleanup script when component unmounts
            document.head.removeChild(script);
        };
    }, []);

    const initAutocomplete = () => {
        if (!window.google) {
            console.error("Google Maps API not loaded");
            return;
        }

        // Initialize autocomplete for source and destination inputs
        sourceAutocompleteRef.current = new window.google.maps.places.Autocomplete(
            sourceInputRef.current,
            { types: ['establishment', 'geocode'] } // Include broader types for places
        );
        destinationAutocompleteRef.current = new window.google.maps.places.Autocomplete(
            destinationInputRef.current,
            { types: ['establishment', 'geocode'] } // Include broader types for places
        );

        // Add listeners for place selection
        sourceAutocompleteRef.current.addListener('place_changed', () => handlePlaceSelect('source'));
        destinationAutocompleteRef.current.addListener('place_changed', () => handlePlaceSelect('destination'));
    };

    const handlePlaceSelect = (type) => {
        const autocomplete = type === 'source' ? sourceAutocompleteRef.current : destinationAutocompleteRef.current;
        const place = autocomplete.getPlace();

        if (!place.geometry) {
            console.error(`No geometry found for selected ${type}`);
            return;
        }

        const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        };

        if (type === 'source') {
            setSource(place.formatted_address); // Set source as formatted address
        } else {
            setDest(place.formatted_address); // Set destination as formatted address
        }
    };

    const handleSource= (e) => {
        setSource(e.target.value);
        setSubmitted(false);
    }

    const handleDest= (e) => {
        setDest(e.target.value);
        setSubmitted(false);
    }

    const handleDate= (e) => {
        setDate(e.target.value);
        setSubmitted(false);
    }

    const handleTime=(e)=>{
        setTime(e.target.value);
        setSubmitted(false);
    }

    // const handleType= (e) => {
    //     setType(e.target.value);
    //     setSubmitted(false);
    // }

    const handleCharge= (e) => {
        setCharges(e.target.value);
        setSubmitted(false);
    }

    //form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if(source === '' || dest === '' || date === '' || type === '' || charges === ''){
            setError(true);
        }else{
            axios.post(`http://localhost:8080/driver/addride/${driver.did}`,{
                source,
                dest,
                date,
                time,
                charges,
                type
            }).then(res=>alert(res.data)).catch(err=>console.log(err));

            setSubmitted(true);
            setError(false);
        }
    };

    //sucess message
    const successMessage = () =>{
        return(
            <div className='success'
            style={{
                display:submitted ? '' : 'none',
            }}>
                {/* <h2>Ride Added successfully</h2> */}
                
            </div>
        )
    };

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

     function logout(){
        sessionStorage.clear();
        navigate("/driver/Login");
     }

     function back(){
        
        navigate("/driver/controller");
     }



  return (
    <div className='cont'>
        <div>
           
        </div>
        <div className='messages'>
            {errorMessage()}
            {successMessage()}
        </div>
        <div className='form-container sign-up-container'>
        <h1>Add Rides(Normal) </h1>
            <form>
        <table>
            <tr>
                <td>
                <label className='label'>Source : </label>
                </td>
                <td>
                <input
                    ref={sourceInputRef}
                    onChange={handleSource}
                    className="input"
                    value={source}
                    type="text"
                    placeholder="Enter source location"
                />
                </td>
            </tr>
            <tr>
                <td>
                <label className='label'>Destination :</label>
                </td>
                <td>
                <input
                    ref={destinationInputRef}
                    onChange={handleDest}
                    className="input"
                    value={dest}
                    type="text"
                    placeholder="Enter destination location"
                />
                </td>
            </tr>
            <tr>
                <td>
                <label className='label'>Date :</label>
                </td>
                <td>
                <input onChange={handleDate}
                className="input"
                value={date}
                 type="date"></input>
                </td>
            </tr>
            <tr>
                <td>
                <label className='label'>Time :</label>
                </td>
                <td>
                <input onChange={handleTime}
                className="input"
                value={time}
                 type="time" placeholder='time'></input>
                </td>
            </tr>
            {/* <tr>
                <td>
                <label className='label'>Type :</label>
                </td>
                <td>
                <input onChange={handleType}
                className="input"
                value={type}
                 type="text"></input>
                </td>
            </tr> */}
            <tr>
                <td>
                <label className='label'>Charges :</label>
                </td>
                <td>
                <input onChange={handleCharge}
                value={charges}
                className='input'
                type="number"></input>
                
                </td>
            </tr>
           <tr>
            <td></td>
            <td> <button
                onClick={handleSubmit}
                 type='submit'>Add Ride</button></td>
           </tr>
               
                
                {/* <tr>
                    <td>
                        <button onClick={logout}>Logout</button>
                    </td>
                    <td>
                        <button onClick={back}>Go back to Driver Dashboard</button>
                    </td>
                </tr> */}
        
        
        </table>
        </form>
        </div>
           
       
    </div>
  )
}


export default AddRide