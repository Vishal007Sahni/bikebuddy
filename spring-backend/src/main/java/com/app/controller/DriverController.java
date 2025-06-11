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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.LoginDto;
import com.app.dto.UpdateProfileDto;
import com.app.dto.UpdateRideDto;
import com.app.emailsender.EmailSenderService;
import com.app.pojos.Driver;
import com.app.pojos.Rides;
import com.app.pojos.User;
import com.app.service.IDriverService;
import com.app.service.IUserService;

@RestController
@RequestMapping("/driver")
@CrossOrigin(origins="http://localhost:3000")
public class DriverController {

	@Autowired
	private IDriverService driverService;
	
	@Autowired
	private EmailSenderService emailSender;
	
	@Autowired
	private IUserService userService;
	
	
	
	@GetMapping("/")
	public ResponseEntity<String> inDriverPage() {
		return new ResponseEntity<String>("Welcome to Customer Page",HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginDriver(@RequestBody LoginDto logindto) {
		User user = userService.findByEmailAndPassword(logindto);
		if(user.getRole().toString().equals("DRIVER")) {
			return new ResponseEntity<>(driverService.extractDriver(user),HttpStatus.OK);
		}
		else
			return new ResponseEntity<>("Invalid Route , Not a Customer ",HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping("/addride/{did}")
	public ResponseEntity<String> addRide(@PathVariable Integer did,@RequestBody Rides ride) {
		boolean status = driverService.addRide(did, ride);
		if(status)
			return new ResponseEntity<String>("Ride Added Successfully",HttpStatus.OK);
		return new ResponseEntity<String>("Adding Ride Failed",HttpStatus.BAD_REQUEST); 
		
	}
	
	@PutMapping("/update-profile/{did}")
	public ResponseEntity<?> updateProfile(@PathVariable Integer did,@RequestBody UpdateProfileDto updateDto){
		if(driverService.updateProfile(did,updateDto)) {
			return new ResponseEntity<>("Details Updated Successfully",HttpStatus.OK);
		}
		return new ResponseEntity<>("Updation Failed",HttpStatus.BAD_REQUEST);
	}
	
	//13 august 
	@GetMapping("/myrides/{did}")
	public ResponseEntity<?> myAddedRides(@PathVariable int did){
		return new ResponseEntity<>(driverService.getMyAddedRides(did),HttpStatus.OK);
	}
	
	@DeleteMapping("/deactivate/{did}")
	public ResponseEntity<?> deactivateAccount(@PathVariable Integer did){
		return new ResponseEntity<>(userService.deleteDriver(did),HttpStatus.OK);
	}
	
	@PutMapping("/update-ride/{rid}")
	public ResponseEntity<?> updateRide(@PathVariable Integer rid,@RequestBody UpdateRideDto updateRideDto){
		return new ResponseEntity<>(driverService.updateRide(rid,updateRideDto),HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-ride/{rid}")
	public ResponseEntity<?> deleteRide(@PathVariable Integer rid){
	
		return new ResponseEntity<>(driverService.deleteRide(rid),HttpStatus.OK);
	}
	
	// Add this endpoint to fetch driver details by driver id (did)
	@GetMapping("/{did}")
	public ResponseEntity<?> getDriverById(@PathVariable Integer did) {
		try {
			Driver driver = driverService.findDriverById(did);
			if (driver == null) {
				return new ResponseEntity<>("Driver not found", HttpStatus.NOT_FOUND);
			}
			// Return user details (name, mobile, email, etc.) from driver.user
			User user = driver.getUser();
			return new ResponseEntity<>(user, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Driver not found", HttpStatus.NOT_FOUND);
		}
	}
	
}
