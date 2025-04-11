import React from "react";
import { useLocation } from "react-router-dom";

export default function RideResults() {
  const location = useLocation();
  const { rides } = location.state || { rides: [] };

  return (
    <div>
      <h2>Available Rides</h2>
      {rides.length > 0 ? (
        <ul>
          {rides.map((ride) => (
            <li key={ride.rid}>
              {ride.source} to {ride.dest} - ₹{ride.charges}
            </li>
          ))}
        </ul>
      ) : (
        <p>No rides found.</p>
      )}
    </div>
  );
}