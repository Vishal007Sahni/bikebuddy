import React, { Component } from 'react'
import { Card, Table } from 'react-bootstrap';
import axios from 'axios';
import './tablestyles.css';

export default class AuthDrivers extends Component {
    constructor(props){
        super(props);
        this.state ={
            drivers :[]
        };
    }

    componentDidMount(){
        axios.get("http://localhost:8080/admin/newdriverlist")
        .then(response => response.data)
        .then((data)=>{
            this.setState({drivers:data});
        });
    }

    authorizeDriver = (driverId)=>{
        axios.post(`http://localhost:8080/admin/driverauth/${driverId}`)
        .then(response => alert(response.data))
        
    };

  render() {
    return (
     <div>
        <h1>Unauthorized Driver List</h1>
        
            <Table className='styled-table'>
                <thead>
                    <tr>
                        <th>Driver Id</th>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>vehicle No</th>
                        <th>College Unique ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.drivers.map((driver)=>(
                            <tr key={driver.did}>
                                <td>{driver.did}</td>
                                <td>{driver.name}</td>
                                <td>{driver.email}</td>
                                <td>{driver.licenseNo}</td>
                                <td>{driver.collegeUniqueId}</td>
                                <td>
                                    <button onClick={this.authorizeDriver.bind(this,driver.did)}>Authorize</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
       
     </div>
    )
  }
}

