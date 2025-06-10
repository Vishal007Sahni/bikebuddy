import React, { Component } from 'react'
import { ButtonGroup, Card, Table } from 'react-bootstrap';
import axios from 'axios';
import './tablestyles.css';

export default class CustomerList extends Component {
    constructor(props){
        super(props);
        this.state ={
            customers :[]
        };
    }

    componentDidMount(){
        axios.get("http://localhost:8080/admin/customerlist")
        .then(response => response.data)
        .then((data)=>{
            this.setState({customers:data});
        });
    };

    deleteAccount = (cid)=>{
        axios.delete("http://localhost:8080/admin/deletecustomer/"+cid)
        .then(response=>alert(response.data))
        this.setState({
            customers: this.state.customers.filter(customer => customer.cid !== cid)
        })
    };

  render() {
    return (
    <div>
        <h1>Customers List</h1>
      
            <Table className='styled-table'>
                <thead>
                    <tr>
                        <th>Customer Id</th>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Adhar Card</th>
                        <th>College Unique ID</th> {/* Added column */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.customers.map((customer)=>(
                            <tr key={customer.cid}>
                                <td>{customer.cid}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.adhar}</td>
                                <td>{customer.collegeUniqueId}</td> {/* Display collegeUniqueId */}
                                <td>
                                    <ButtonGroup>
                                    <button onClick={this.deleteAccount.bind(this,customer.cid)}>Delete</button>
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

