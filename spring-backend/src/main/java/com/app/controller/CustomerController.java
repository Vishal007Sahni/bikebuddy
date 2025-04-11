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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.FindRideDto;
import com.app.dto.LoginDto;
import com.app.dto.RideDto;
import com.app.dto.UpdateProfileDto;
import com.app.pojos.Customer;
import com.app.pojos.Driver;
import com.app.pojos.Rides;
import com.app.pojos.User;
import com.app.service.ICustomerService;
import com.app.service.IPaymentService;
import com.app.service.IRideService;
import com.app.service.IUserService;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins="http://localhost:3000")
public class CustomerController {

	@Autowired
	private ICustomerService customerService;
	
	@Autowired
	private IRideService rideService;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private IPaymentService payService;
	
	
	//customer login
	@PostMapping("/login")
	public ResponseEntity<?> loginCustomer(@RequestBody LoginDto logindto) {
		User user = userService.findByEmailAndPassword(logindto);
		if(user.getRole().toString().equals("CUSTOMER")) {
			return new ResponseEntity<>(customerService.extractCustomer(user),HttpStatus.OK);
		}
		else
			return new ResponseEntity<>("Invalid Route , Not a Customer ",HttpStatus.BAD_REQUEST);
	}
	
	
	//find normal specific rides according to source and destination
	@PostMapping("/findride/normal")
	public ResponseEntity<?> getRides(@RequestBody FindRideDto findRide) {
	    System.out.println("Received request to find normal rides with source: " + findRide.getSource() + " and destination: " + findRide.getDest());
	    List<RideDto> rides = rideService.findNormalRides(findRide);

	    if (rides.isEmpty()) {
	        System.out.println("No rides found for the given source and destination.");
	    } else {
	        System.out.println("Rides found: " + rides.size());
	        rides.forEach(ride -> System.out.println("Ride: " + ride)); // Log each ride
	    }

	    return new ResponseEntity<>(rides, HttpStatus.OK);
	}
	
	//find subscription specific rides according to source and destination
	@PostMapping("/findride/subs")
	public ResponseEntity<?> getSubsRides(@RequestBody FindRideDto findRide){
		return new ResponseEntity<>(rideService.findSubsRides(findRide),HttpStatus.OK);
	}
	
	@DeleteMapping("/deactivate/{cid}")
	public ResponseEntity<?> deactivateAccount(@PathVariable Integer cid){
		return new ResponseEntity<>(userService.deleteCustomer(cid),HttpStatus.OK);
	}
	
		//previous booked rides
	@GetMapping("/previous_rides/{cid}")
	public ResponseEntity<?> myPreviousRides(@PathVariable Integer cid){
		return new ResponseEntity<>(customerService.myPreviousRides(cid),HttpStatus.OK);
	}
	
	@PutMapping("/update-profile/{cid}")
	public ResponseEntity<?> updateProfile(@PathVariable Integer cid,@RequestBody UpdateProfileDto updateDto){
		if(customerService.updateProfile(cid,updateDto)) {
			return new ResponseEntity<>("Details Updated Successfully",HttpStatus.OK);
		}
		return new ResponseEntity<>("Updation Failed",HttpStatus.BAD_REQUEST); 
	}

	@PostMapping("/rate-ride/{pid}")
	public ResponseEntity<?> rateRide(@PathVariable Integer pid,@RequestBody Double rating) {
		customerService.rateRide(pid, rating);
		return new ResponseEntity<>("Ratings Submitted",HttpStatus.OK);
	}
	

	@GetMapping("/confirmride/{rid}")
	public ResponseEntity<Driver> confirmRide(@PathVariable Integer rid){
		return new ResponseEntity<Driver>(rideService.confirmDriverDetails(rid),HttpStatus.OK);
	}
	
	
	
	//booking ride
		@PostMapping("/bookride/{cid}/{rid}")
		public ResponseEntity<String> bookRide(@PathVariable Integer cid,@PathVariable Integer rid) {
			boolean status = payService.bookRide(cid, rid,"Online");
			if(status)
				return new ResponseEntity<String>("Ride Booked Successfully ... Hurrah!!!!",HttpStatus.OK);
				else
					return new ResponseEntity<String>("Ride Booking Failed",HttpStatus.BAD_REQUEST);
		}
		
		
		@PostMapping("/return/{rid}")
		public ResponseEntity<?> returnRide(@PathVariable Integer rid){
			Rides ride= rideService.returnRide(rid);
			return new ResponseEntity<>(ride,HttpStatus.OK);
		}
	
		@GetMapping("/booked-rides/{cid}")
		public ResponseEntity<?> bookedRides(@PathVariable Integer cid) {
			return new ResponseEntity<>(customerService.getRides(cid),HttpStatus.OK);
		}
	
	
	
	
}
