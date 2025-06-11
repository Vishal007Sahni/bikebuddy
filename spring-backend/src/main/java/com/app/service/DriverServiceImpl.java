package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.DriverResponse;
import com.app.dto.UpdateProfileDto;
import com.app.dto.UpdateRideDto;
import com.app.dto.UserDto;
import com.app.pojos.Driver;
import com.app.pojos.Rides;
import com.app.pojos.User;
import com.app.repo.IDriverRepo;
import com.app.repo.IRidesRepo;
import com.app.repo.IUserRepo;

@Service
@Transactional
public class DriverServiceImpl implements IDriverService {

	@Autowired
	private IDriverRepo driverRepo;
	
	@Autowired
	private IUserRepo userRepo;
	
	@Autowired
	private IRidesRepo rideRepo;
	
	@Override
	public List<DriverResponse> getAllDrivers() {
		return driverRepo.getDriverList();
	}
	
	@Override
	public List<DriverResponse> getAllNewDrivers() {
		List<DriverResponse> normalDrivers = driverRepo.getDriverList();
		return normalDrivers.stream().filter(d->d.isStatus()==false).collect(Collectors.toList());
	}
	
	@Override
	public void register(UserDto userDto,User user) {
		Driver driver = new Driver(user,userDto.getDriverDto().getVehicleNo(),userDto.getDriverDto().getLicenseNo());
		driverRepo.save(driver);
	}

	@Override
	public boolean addRide(Integer did, Rides ride) {
		try {
			Driver driver = driverRepo.findById(did).orElseThrow(() -> new RuntimeException("Driver not found"));
			driver.addRides(ride);
			driverRepo.save(driver);
			return true;
		} catch (Exception e) {
			// Log the exception if needed
			System.err.println("Error adding ride: " + e.getMessage());
			return false;
		}
	}
	
	@Override
	public List<Rides> getMyAddedRides(Integer did) {
		Driver driver = driverRepo.findById(did).orElseThrow(()-> new RuntimeException("Driver Not Found"));
		return driver.getRidesList();
		
	}
	
	@Override
	public DriverResponse extractDriver(User user) {
		Driver driver = driverRepo.getDriver(user.getUid());
		return new DriverResponse(
			user.getUid(),
			user.getName(),
			user.getEmail(),
			user.getMobile(),
			user.getAdhar(),
			driver.getLicenseNo(),
			driver.getVehicleNo(),
			driver.getDid(),
			driver.isStatus(),
			user.getCollegeUniqueId() // Pass collegeUniqueId
		);
	}

	@Override
	public boolean updateProfile(Integer did,UpdateProfileDto updateDto) {
		boolean status = false;
		User user = userRepo.findById(updateDto.getUid()).orElseThrow(()-> new RuntimeException("User Not Found"));
		Driver driver = driverRepo.findById(did).orElseThrow(()-> new RuntimeException("Driver Not Found"));
		user.setName(updateDto.getName());
		user.setEmail(updateDto.getEmail());
		user.setMobile(updateDto.getMobile());
		user.setAdhar(updateDto.getAdhar());
		driver.setLicenseNo(updateDto.getLicenseNo());
		driver.setVehicleNo(updateDto.getVehicleNo());
		userRepo.save(user);
		driverRepo.save(driver);
		status=true;

		return status;
	}

	@Override
	public String deleteRide(Integer rid) {		
		Rides ride = rideRepo.findById(rid).orElseThrow(()-> new RuntimeException("Ride Not Found"));
		rideRepo.delete(ride);
		return "Ride Deleted";
	}

	@Override
	public String updateRide(Integer rid,UpdateRideDto updateRidedto) {
		Rides ride = rideRepo.findById(rid).orElseThrow(()-> new RuntimeException("Ride Not Found"));
		ride.setSource(updateRidedto.getSource());
		ride.setDest(updateRidedto.getDestination());
		ride.setDate(updateRidedto.getDate());
		ride.setTime(updateRidedto.getTime());
		ride.setCharges(updateRidedto.getCharges());
		rideRepo.save(ride);
		return "Ride Details Updated Successfully";
	}

	@Override
	public Driver findDriverById(Integer did) {
		return driverRepo.findById(did).orElse(null);
	}
	
	
	

}
