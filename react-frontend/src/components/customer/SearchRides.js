import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./SearchRides.css"; // Import the CSS file

const LocationSearchBar = ({ onPlaceSelected }) => {
  const [sourceQuery, setSourceQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [sourceLocation, setSourceLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [rides, setRides] = useState([]);
  const [distance, setDistance] = useState(null);
  const [date, setDate] = useState("");
  const mapRef = useRef(null);
  const sourceAutocompleteRef = useRef(null);
  const destinationAutocompleteRef = useRef(null);
  const sourceInputRef = useRef(null);
  const destinationInputRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const sourceMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const directionsServiceRef = useRef(null);

  useEffect(() => {
    // Load Google Maps JavaScript API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCAI_95oRUs7Pp8woFcyy3bkXpQ882Zt4Y&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMapAndAutocomplete;
    document.head.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      document.head.removeChild(script);
    };
  }, []);

  const initMapAndAutocomplete = () => {
    if (!window.google) {
      console.error("Google Maps API not loaded");
      return;
    }

    // Initialize the map
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 }, // Default center
      zoom: 12, // Default zoom level
    });

    // Try to center the map on the user's device location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          mapInstanceRef.current.setCenter(userLocation);
        },
        (error) => console.error("Error getting device location:", error)
      );
    }

    // Initialize draggable markers
    sourceMarkerRef.current = new window.google.maps.Marker({
      map: mapInstanceRef.current,
      title: "Source",
      draggable: true,
    });
    destinationMarkerRef.current = new window.google.maps.Marker({
      map: mapInstanceRef.current,
      title: "Destination",
      draggable: true,
    });

    // Add drag event listeners to markers
    sourceMarkerRef.current.addListener("dragend", () =>
      handleMarkerDrag("source")
    );
    destinationMarkerRef.current.addListener("dragend", () =>
      handleMarkerDrag("destination")
    );

    // Create autocomplete objects for source and destination
    sourceAutocompleteRef.current = new window.google.maps.places.Autocomplete(
      sourceInputRef.current,
      { types: ["establishment"] }
    );
    destinationAutocompleteRef.current =
      new window.google.maps.places.Autocomplete(destinationInputRef.current, {
        types: ["establishment"],
      });

    // Add listeners for place selection
    sourceAutocompleteRef.current.addListener("place_changed", () =>
      handlePlaceSelect("source")
    );
    destinationAutocompleteRef.current.addListener("place_changed", () =>
      handlePlaceSelect("destination")
    );

    // Initialize Directions Service and Renderer
    directionsServiceRef.current = new window.google.maps.DirectionsService();
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
      map: mapInstanceRef.current,
    });
  };

  const handlePlaceSelect = (type) => {
    const autocomplete =
      type === "source"
        ? sourceAutocompleteRef.current
        : destinationAutocompleteRef.current;
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      console.error(`No geometry found for selected ${type}`);
      return;
    }

    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    if (type === "source") {
      setSourceLocation(location);
      sourceMarkerRef.current.setPosition(location);
      mapInstanceRef.current.setCenter(location);
    } else {
      setDestinationLocation(location);
      destinationMarkerRef.current.setPosition(location);
      mapInstanceRef.current.setCenter(location);
    }

    // Send selected place data to parent component
    onPlaceSelected({
      type,
      name: place.name,
      address: place.formatted_address,
      location,
      placeId: place.place_id,
      placeDetails: place,
    });

    // If both source and destination are selected, calculate directions
    if (sourceLocation && destinationLocation) {
      calculateDirections();
    }
  };

  const handleMarkerDrag = (type) => {
    const marker =
      type === "source"
        ? sourceMarkerRef.current
        : destinationMarkerRef.current;
    const position = marker.getPosition();

    const location = {
      lat: position.lat(),
      lng: position.lng(),
    };

    if (type === "source") {
      setSourceLocation(location);
      setSourceQuery(`Lat: ${location.lat}, Lng: ${location.lng}`);
    } else {
      setDestinationLocation(location);
      setDestinationQuery(`Lat: ${location.lat}, Lng: ${location.lng}`);
    }

    // If both source and destination are selected, calculate directions
    if (sourceLocation && destinationLocation) {
      calculateDirections();
    }
  };

  const calculateDirections = () => {
    if (!sourceLocation || !destinationLocation) {
      alert("Please select both source and destination locations.");
      return;
    }

    const request = {
      origin: sourceLocation,
      destination: destinationLocation,
      travelMode: "DRIVING", // You can change this to 'WALKING', 'BICYCLING', or 'TRANSIT'
    };

    directionsServiceRef.current.route(request, (result, status) => {
      if (status === "OK") {
        directionsRendererRef.current.setDirections(result);
      } else {
        console.error("Error calculating directions:", status);
      }
    });
  };

  const calculateDistance = () => {
    if (!sourceLocation || !destinationLocation) {
      alert("Please select both source and destination locations.");
      return;
    }

    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [sourceLocation],
        destinations: [destinationLocation],
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK") {
          const result = response.rows[0].elements[0];
          if (result.status === "OK") {
            setDistance(result.distance.text);
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

  const searchRides = async () => {
    console.log("Search Rides button clicked"); // Log button click

    if (!sourceLocation || !destinationLocation || !date) {
      alert("Please select source, destination, and date.");
      return;
    }

    calculateDistance(); // Calculate distance before searching rides

    try {
      const response = await axios.post(
        "http://localhost:8080/customer/findride/normal",
        {
          source: sourceQuery, // Send source as a string
          dest: destinationQuery, // Send destination as a string
          date: date,
        }
      );
      console.log("Rides fetched successfully:", response.data); // Log fetched rides
      setRides(response.data);

      if (response.data.length === 0) {
        console.log("No rides available for the selected criteria."); // Log no rides
      }
    } catch (error) {
      console.error("Error fetching rides:", error);
      alert("Failed to fetch rides. Please try again.");
    }
  };

  return (
    <div className="location-search-container">
      <div ref={mapRef} className="map-container"></div>
      <div className="search-inputs-container">
        <div className="search-input-wrapper">
          <input
            ref={sourceInputRef}
            type="text"
            value={sourceQuery}
            onChange={(e) => setSourceQuery(e.target.value)}
            placeholder="Enter source location"
            className="location-search-input"
          />
        </div>
        <div className="search-input-wrapper">
          <input
            ref={destinationInputRef}
            type="text"
            value={destinationQuery}
            onChange={(e) => setDestinationQuery(e.target.value)}
            placeholder="Enter destination location"
            className="location-search-input"
          />
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Enter date (YYYY-MM-DD)"
            className="location-search-input"
          />
        </div>
        <button onClick={searchRides} className="search-button">
          Search Rides
        </button>
      </div>
      {distance && <p className="distance-info">Distance: {distance}</p>}
      <div className="rides-list">
        {rides.length > 0 ? (
          <ul>
            {rides.map((ride, index) => (
              <li key={index}>
                Ride from {ride.source} to {ride.destination}, Price:{" "}
                {ride.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No rides found.</p>
        )}
      </div>
    </div>
  );
};

export default LocationSearchBar;
