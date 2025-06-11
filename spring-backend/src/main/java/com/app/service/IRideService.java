package com.app.service;

import java.util.List;

import com.app.dto.FindRideDto;
import com.app.dto.RideDetailsDto;
import com.app.dto.RideDto;
import com.app.pojos.Driver;
import com.app.pojos.Rides;

public interface IRideService {
    List<Rides> getAllRides();
    List<RideDto> findNormalRides(FindRideDto findRide);
    List<RideDto> findSubsRides(FindRideDto findRide);
    Driver confirmDriverDetails(Integer rid);
    Rides returnRide(Integer rid);
    Rides findRides(Integer rid);
    RideDetailsDto returnRideDetails(Integer rid);
}
