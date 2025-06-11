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
    const [distance, setDistance] = useState(null); // State to store calculated distance
    const [isAuthorized, setIsAuthorized] = useState(true); // New state

    //error checking
    const [submitted, setSubmitted] = useState('');
    const [error, setError] = useState('');

    const sourceInputRef = useRef(null);
    const destinationInputRef = useRef(null);
    const sourceAutocompleteRef = useRef(null);
    const destinationAutocompleteRef = useRef(null);

    useEffect(() => {
        const driver = JSON.parse(sessionStorage.getItem('driver-info'));
        console.log("SessionStorage driver-info:", driver); // Log session storage data
        setDriver(driver);

        // Check if driver is authorized
        if (driver && driver.status !== true) {
            setIsAuthorized(false);
        } else {
            setIsAuthorized(true);
        }

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

        if (type === 'source') {
            setSource(place.formatted_address); // Use formatted address
        } else {
            setDest(place.formatted_address); // Use formatted address
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

    const handleCharge= (e) => {
        setCharges(e.target.value);
        setSubmitted(false);
    }

    const calculateDistance = () => {
        if (!source || !dest) {
            alert("Please select both source and destination locations.");
            return;
        }

        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [source],
                destinations: [dest],
                travelMode: "DRIVING",
            },
            (response, status) => {
                if (status === "OK") {
                    const result = response.rows[0].elements[0];
                    if (result.status === "OK") {
                        const distanceInKm = result.distance.value / 1000; // Convert meters to kilometers
                        setDistance(distanceInKm);
                        validateCharges(distanceInKm); // Validate charges based on distance
                    } else {
                        console.error("Error calculating distance:", result.status);
                        setDistance(null);
                    }
                } else {
                    console.error("Distance Matrix API error:", status);
                    setDistance(null);
                }
            }
        );
    };

    const validateCharges = (distanceInKm) => {
        const maxAllowedCharges = distanceInKm * 6; // Maximum allowed charges at ₹6 per km
        if (charges > maxAllowedCharges) {
            alert(
                `Charges exceed the maximum allowed limit of ₹${maxAllowedCharges.toFixed(
                    2
                )} for a distance of ${distanceInKm.toFixed(2)} km. Please adjust the charges.`
            );
        }
    };

    //form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isAuthorized) {
            alert("You are not authorized to add rides. Please wait for admin approval.");
            return;
        }

        if (!source || !dest || !date || !type || !charges) {
            setError(true);
            return;
        }

        if (distance === null) {
            alert("Please calculate the distance before submitting.");
            return;
        }

        const maxAllowedCharges = (distance * 9)/2; // Maximum allowed charges at ₹6 per km
        if (charges > maxAllowedCharges) {
            alert(
                `Charges exceed the maximum allowed limit of ₹${maxAllowedCharges.toFixed(
                    2
                )} for a distance of ${distance.toFixed(2)} km. Please adjust the charges.`
            );
            return;
        }

        if (!driver?.did) {
            console.error("Driver ID is undefined. Please check sessionStorage.");
            alert("Driver information is missing. Please log in again.");
            return;
        }

        console.log("Driver ID:", driver.did); // Log driver ID for debugging

        axios
            .post(`http://localhost:8080/driver/addride/${driver.did}`, {
                source,
                dest,
                date,
                time,
                charges,
                type,
            })
            .then((res) => alert(res.data))
            .catch((err) => console.log(err));

        setSubmitted(true);
        setError(false);
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
            {!isAuthorized && (
                <div style={{ color: 'red', marginBottom: '20px' }}>
                    You are not authorized to add rides. Please wait for admin approval.
                </div>
            )}
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
            <tr>
                <td>
                <label className='label'>Distance:</label>
                </td>
                <td>
                <button type="button" onClick={calculateDistance}>
                    Calculate Distance
                </button>
                {distance && (
                    <span style={{ marginLeft: "10px" }}>
                    {distance.toFixed(2)} km
                    </span>
                )}
                </td>
            </tr>
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
                 type='submit'
                 disabled={!isAuthorized}
                >Add Ride</button></td>
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