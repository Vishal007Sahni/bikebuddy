import React, { Component } from 'react'
import { ButtonGroup, Card, Table } from 'react-bootstrap';
import axios from 'axios';
import './tablestyles.css';

export default class DriverList extends Component {
    constructor(props){
        super(props);
        this.state ={
            drivers :[]
        };
    }

    componentDidMount(){
        axios.get("http://localhost:8080/admin/driverlist")
        .then(response => response.data)
        .then((data)=>{
            this.setState({drivers:data});
        });
    }

    deleteAccount = (did)=>{
        axios.delete("http://localhost:8080/admin/deletedriver/"+did)
        .then(response=>alert(response.data))
        this.setState({
            drivers: this.state.drivers.filter(driver => driver.did !== did)
        })
    };

  render() {
    return (
    <div>
     
        <h1> Driver List</h1>
        
            <Table className='styled-table'>
                <thead>
                    <tr>
                        <th>Driver Id</th>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Vehilce No</th>
                        <th>College Unique ID</th>
                        <th>Actions</th>
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
                                    <ButtonGroup>
                                        <button onClick={this.deleteAccount.bind(this,driver.did)}>Delete</button>
                                    </ButtonGroup>
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

