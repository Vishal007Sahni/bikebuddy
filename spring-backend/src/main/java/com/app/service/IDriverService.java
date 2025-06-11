package com.app.service;

import java.util.List;

import com.app.dto.DriverResponse;
import com.app.dto.LoginDto;
import com.app.dto.UpdateProfileDto;
import com.app.dto.UpdateRideDto;
import com.app.dto.UserDto;
import com.app.pojos.Driver;
import com.app.pojos.Rides;
import com.app.pojos.User;

public interface IDriverService {

	public List<DriverResponse> getAllDrivers();
	
	public List<DriverResponse> getAllNewDrivers();
	
	public void register(UserDto userDto,User user);
	
	public boolean addRide(Integer did,Rides ride);
	
	public List<Rides> getMyAddedRides(Integer did);
	
	public DriverResponse extractDriver(User user);
	
	public boolean updateProfile(Integer did,UpdateProfileDto updateDto);

	public String deleteRide(Integer rid);

	public String updateRide(Integer rid,UpdateRideDto updateRideDto);
	
	public Driver findDriverById(Integer did);
	
	
	
	
}

