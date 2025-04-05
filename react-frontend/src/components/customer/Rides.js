import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import axios from "axios";

export default function Rides() {
  let navigate = useNavigate();
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const storedRides = sessionStorage.getItem("rides");
    if (!storedRides) {
      const sampleData = [
        {
          rid: "123",
          source: "A",
          dest: "B",
          date: "2025-04-01",
          time: "10:00",
          charges: 100,
          rating: 4.5,
        },
      ];
      sessionStorage.setItem("rides", JSON.stringify(sampleData));
      setRides(sampleData);
    } else {
      setRides(JSON.parse(storedRides));
    }
  }, []);

  const confirmRide = (rid) => {
    axios
      .get(`http://localhost:8080/customer/confirmride/${rid}`)
      .then((res) => {
        console.log("Posting data", res);
        sessionStorage.setItem("driver", JSON.stringify(res.data));
        sessionStorage.setItem("rid", rid);
        navigate("/customer/bookride");
      })
      .catch((error) => {
        console.error("Error confirming ride:", error);
        alert("Error confirming ride. Please try again.");
      });
  };

  return (
    <div>
      {rides.length > 0 ? (
        <Table border={1} cellPadding={8} cellSpacing={0} className="table1">
          <thead>
            <tr>
              <th>Source</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Time</th>
              <th>Charges</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride) => (
              <tr key={ride.rid}>
                <td>{ride.source}</td>
                <td>{ride.dest}</td>
                <td>{ride.date}</td>
                <td>{ride.time}</td>
                <td>{ride.charges}</td>
                <td>{ride.rating}</td>
                <td>
                  <button onClick={() => confirmRide(ride.rid)}>
                    Select {ride.rid}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No rides available</p>
      )}
    </div>
  );
}
