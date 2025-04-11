package com.app.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CustomerResponse;
import com.app.dto.DriverResponse;
import com.app.dto.LoginDto;
import com.app.emailsender.EmailSenderService;
import com.app.pojos.Admin;
import com.app.pojos.Customer;
import com.app.pojos.Driver;
import com.app.pojos.Rides;
import com.app.service.IAdminService;
import com.app.service.ICustomerService;
import com.app.service.IDriverService;
import com.app.service.IPaymentService;
import com.app.service.IRideService;
import com.app.service.IUserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
	
	@Autowired
	private IAdminService adminService;
	
	@Autowired
	private IDriverService driverService;
	
	@Autowired
	private ICustomerService customerService;
	
	@Autowired
	private IRideService rideService;
	
	@Autowired
	private IPaymentService payService;
	
	@Autowired
	private IUserService userService;
	
	@GetMapping("/")
	public ResponseEntity<String> inAdminPage() {
		return new ResponseEntity<>("Welcome to Admin Section",HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginAdmin(@RequestBody LoginDto logindto) {
		Admin admin =adminService.authenticateAdmin(logindto);
		if(admin!=null) {
			//emailSender.sendEmail(logindto.getEmail(), "test-email", "testing-email");
			return new ResponseEntity<>(admin,HttpStatus.OK);
		}
		else
			return new ResponseEntity<>("Invalid Details ,Login Failed",HttpStatus.UNAUTHORIZED);
	}
	
	//get all authorized drivers
	@GetMapping("/driverlist")
	public ResponseEntity<?> getDriverList(){
		List<DriverResponse> driverList = driverService.getAllDrivers(); 
		return new ResponseEntity<>(driverList,HttpStatus.OK);
	}
	
	//get unauthorized drivers
	@GetMapping("/newdriverlist")
	public ResponseEntity<?> getDriverList2(){
		List<DriverResponse> driverList = driverService.getAllNewDrivers(); 
		return new ResponseEntity<>(driverList,HttpStatus.OK);
	}
	
	//get All Customer
		@GetMapping("/customerlist")
		public ResponseEntity<?> getCustomerList(){
			List<CustomerResponse> customerList = customerService.getAllCustomers(); 
			return new ResponseEntity<>(customerList,HttpStatus.OK);
		}
	
	//authenticate driver
	@PostMapping("/driverauth/{did}")
	public ResponseEntity<String> authDriver(@PathVariable int did) {


		return new ResponseEntity<String>(adminService.authDriver(did),HttpStatus.OK);
	}
	
	
	@GetMapping("/rideslist")
	public ResponseEntity<?> getRidesList(){
		return new ResponseEntity<>(rideService.getAllRides(),HttpStatus.OK); 
	}
	
	
	@DeleteMapping("/deletedriver/{did}")
	public ResponseEntity<?> deleteDriver(@PathVariable Integer did) 
	{
		return new ResponseEntity<>(userService.deleteDriver(did),HttpStatus.OK);
	}
	
	@DeleteMapping("/deletecustomer/{cid}")
	public ResponseEntity<?> deactivateAccount(@PathVariable Integer cid){
		return new ResponseEntity<>(userService.deleteCustomer(cid),HttpStatus.OK);
	}
	
	
	@GetMapping("/paymentstable")
	public ResponseEntity<?> getPaymentsTable(){
		return new ResponseEntity<>(payService.getAllPayments(),HttpStatus.OK);
	}
	
	
	
}
