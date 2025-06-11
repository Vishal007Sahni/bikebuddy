import axios from "axios"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap";
import Rating from "./Driverfeedback";

export default function Previousride(){
    const [prev,setPrev] = useState([]);
    const [cust,setUser] = useState({});



    useEffect(()=>{
        let cust = JSON.parse(sessionStorage.getItem('user'))
        setUser(cust)
        if (cust && cust.cid) {
            console.log("Fetching previous rides for cid:", cust.cid);
            axios.get(`http://localhost:8080/customer/previous_rides/${cust.cid}`)
            .then(res=>{
                console.log('Received previous rides:', res.data);
                setPrev(res.data)
            })
            .catch(err => {
                console.error("Error fetching previous rides:", err);
                setPrev([]);
            });
        } else {
            console.warn("No customer or cid found in sessionStorage.");
        }
    },[])
    console.log(cust.cid)
    return (
    <div>

<h1>booked rides List</h1>
        
        <Table className='styled-table'>
            <thead>
                <tr>
                   
                   
                    <th>source</th>
                    <th>dest</th>
                    <th>date</th>
                    <th>charges</th>
                    <th>type</th>
                    <th>time</th>
                    <th>mode</th>
                    <th>Ratings</th>
                           
                    
                </tr>
            </thead>
            <tbody>
                {
                   prev.map((r)=>(
                        <tr key={r.pid}>
                            <td>{r.rides.source}</td>
                            <td>{r.rides.dest}</td>
                            <td>{r.date}</td>
                            <td>{r.rides.charges}</td>
                            <td>{r.rides.type}</td>
                            <td>{r.time}</td>
                            <td>{r.mode}</td>

                           
                            <td>
                                <Rating pid={r.pid}/>
                            

                            </td>
                                                            
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    </div>
    )
}