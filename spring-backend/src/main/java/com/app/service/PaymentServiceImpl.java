package com.app.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pojos.CompanyAccount;
import com.app.pojos.Customer;
import com.app.pojos.Driver;
import com.app.pojos.Payment;
import com.app.pojos.Rides;
import com.app.repo.ICompanyAccountRepo;
import com.app.repo.ICustomerRepo;
import com.app.repo.IDriverRepo;
import com.app.repo.IPaymentRepo;
import com.app.repo.IRidesRepo;

@Service
@Transactional
public class PaymentServiceImpl implements IPaymentService {

	@Autowired
	private IPaymentRepo payRepo;
	
	@Autowired
	private ICustomerRepo custRepo;
	
	@Autowired
	private IRidesRepo rideRepo;
	
	@Autowired
	private ICompanyAccountRepo compRepo;
	
	@Autowired
	private IDriverRepo driverRepo;
	
	@Override
	public boolean bookRide(Integer cid, Integer rid, String mode) {
	    Customer c = custRepo.findById(cid).orElseThrow(() -> new RuntimeException("Customer Not Found"));
	    Rides r = rideRepo.findById(rid).orElseThrow(() -> new RuntimeException("Ride Not Found"));
	    Driver d = driverRepo.findById(r.getDriver().getDid()).orElseThrow(() -> new RuntimeException("Driver Not Found"));

	    double commissionRate = 0.1; // 10% platform commission
	    double totalCharges = r.getCharges();
	    double commission = totalCharges * commissionRate;
	    double driverEarnings = totalCharges - commission;

	    // Create a payment record
	    Payment p = new Payment(c, r, LocalDate.now(), LocalTime.now(), mode);
	    c.addPayment(p);
	    r.setPid(p);
	    r.setStatus(true);

	    // Update driver's earnings
	    d.setEarnings(d.getEarnings() + driverEarnings);

	    // Save company commission record
	    compRepo.save(new CompanyAccount(c.getCid(), r.getRid(), p.getPid(), mode, LocalDate.now(), LocalTime.now(), commission));

	    // Save payment record
	    if (p != null) {
	        payRepo.save(p);
	        return true;
	    }

	    return false;
	}

	@Override
	public List<Payment> getAllPayments() {
		return payRepo.findAll();
	}
	
	
	
}
