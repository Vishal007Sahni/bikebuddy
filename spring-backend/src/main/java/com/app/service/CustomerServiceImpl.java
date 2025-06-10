package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.BookedRides;
import com.app.dto.CustomerResponse;
import com.app.dto.UpdateProfileDto;
import com.app.pojos.Customer;
import com.app.pojos.Driver;
import com.app.pojos.Payment;
import com.app.pojos.User;
import com.app.repo.ICustomerRepo;
import com.app.repo.IDriverRepo;
import com.app.repo.IPaymentRepo;
import com.app.repo.IUserRepo;

@Service
@Transactional
public class CustomerServiceImpl implements ICustomerService {

	@Autowired
	private ICustomerRepo custRepo;
	
	@Autowired
	private IUserRepo userRepo;
	
	@Autowired 
	private IPaymentRepo payRepo;
	
	@Autowired 
	private IDriverRepo driverRepo;
		
	@Override
	public List<CustomerResponse> getAllCustomers() {
		return custRepo.getCustomerList();
	}
	
	@Override
	public void register(User user) {
		Customer customer = new Customer(user);
		custRepo.save(customer);
	}
	
	@Override
	public List<Payment> myPreviousRides(Integer cid){
		Customer cust = custRepo.findById(cid).orElseThrow(()->new RuntimeException("Customer Not Found")); 
		return cust.getPaymentList();
	}
	
	@Override
	public CustomerResponse extractCustomer(User user) {
		Integer cid = custRepo.getCustomerId(user.getUid());
		return new CustomerResponse(
			user.getUid(),
			user.getName(),
			user.getEmail(),
			user.getMobile(),
			user.getAdhar(),
			cid,
			user.getCollegeUniqueId() // Pass collegeUniqueId
		);
	}

	@Override
	public boolean updateProfile(Integer cid, UpdateProfileDto updateDto) {
		System.out.println("Updating profile for CID: " + cid); // Log CID
		System.out.println("Update DTO: " + updateDto); // Log update data
		boolean status = false;
		try {
			Customer customer = custRepo.findById(cid).orElseThrow(() -> new RuntimeException("Customer Not Found"));
			User user = userRepo.findById(updateDto.getUid()).orElseThrow(() -> new RuntimeException("User Not Found"));
			System.out.println("Found Customer and User for update."); // Log successful fetch
			user.setEmail(updateDto.getEmail());
			user.setName(updateDto.getName());
			user.setMobile(updateDto.getMobile());
			user.setAdhar(updateDto.getAdhar());
			userRepo.save(user);
			status = true;
			System.out.println("Profile updated successfully in the database."); // Log success
		} catch (Exception e) {
			System.err.println("Error during profile update: " + e.getMessage()); // Log errors
		}
		return status;
	}

	@Override
	public void rateRide(Integer pid, Double rating) {
		Payment payment = payRepo.findById(pid).orElseThrow(()->new RuntimeException("Customer Not Found"));
		Integer rid = payment.getRides().getDriver().getDid();
		Driver driver = driverRepo.findById(rid).orElseThrow(()->new RuntimeException("Customer Not Found"));
		int rideCount = driverRepo.countRides(driver.getDid());
		double ratings = driver.getRatingsSum()/rideCount;
		driver.setRatings(ratings);
		driverRepo.save(driver);		
		
	}
	@Override
	public Customer findCustomer(Integer cid) {
		return custRepo.findById(cid).orElseThrow(()->new RuntimeException("Customer Not Found"));
	}

	@Override
	public List<BookedRides> getRides(Integer cid) {
		List<BookedRides> rides = new ArrayList<BookedRides>();	
		Customer customer = custRepo.findById(cid).orElseThrow(()->new RuntimeException("Customer Not Found"));
		List<Payment> paymentList = customer.getPaymentList();
		for(int i=0;i<paymentList.size();i++) {
			BookedRides bookRides = new BookedRides(paymentList.get(i).getPid() ,paymentList.get(i).getRides().getSource(),paymentList.get(i).getRides().getDest(),paymentList.get(i).getRides().getType().toString(),paymentList.get(i).getRides().getCharges(),paymentList.get(i).getRides().getDate(),paymentList.get(i).getMode(),paymentList.get(i).getDate());
			rides.add(bookRides);
		}
		return rides;
	}
	
	


}
