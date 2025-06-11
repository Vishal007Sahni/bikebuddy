package com.app.service;
import com.app.pojos.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.FindRideDto;
import com.app.dto.RideDto;
import com.app.dto.RideDetailsDto;
import com.app.pojos.CompanyAccount;
import com.app.pojos.Customer;
import com.app.pojos.Rides;
import com.app.repo.ICustomerRepo;
import com.app.repo.IRidesRepo;

@Service
@Transactional
public class RideServiceImpl implements IRideService {

	@Autowired
	private IRidesRepo rideRepo;
	
	@Autowired
	private ICustomerRepo custRepo;
	
	@Override
	public List<Rides> getAllRides() {
		return rideRepo.findAll();
	}

	@Override
	public List<RideDto> findNormalRides(FindRideDto findRide) {
		String source = findRide.getSource();
		String dest = findRide.getDest();
		LocalDate time = findRide.getDate();

		// Fetch all rides
		List<Rides> allRides = rideRepo.findAll();
		System.out.println("Total rides fetched from database: " + allRides.size());

		// Filter rides within 3 km radius
		List<Rides> nearbyRides = allRides.stream()
			.filter(ride -> {
				double sourceDistance = calculateDistanceFromGoogleAPI(source, ride.getSource());
				double destDistance = calculateDistanceFromGoogleAPI(dest, ride.getDest());
				System.out.println("Source Distance: " + sourceDistance + " km, Destination Distance: " + destDistance + " km for Ride ID: " + ride.getRid());
				return sourceDistance <= 3 && destDistance <= 3;
			})
			.collect(Collectors.toList());

		System.out.println("Nearby rides within 3 km: " + nearbyRides.size());

		// Convert to DTO
		List<RideDto> dtoList = new ArrayList<>();
		for (Rides ride : nearbyRides) {
			RideDto dtoObj = new RideDto(
				ride.getRid(),
				ride.getSource(),
				ride.getDest(),
				ride.getDate(),
				ride.getTime(),
				ride.getCharges(),
				ride.getType(),
				ride.getDriver().getRatings(),
				ride.isStatus(),
				ride.getDriver().getDid()
			);
			dtoList.add(dtoObj);
		}

		return dtoList.stream()
			.filter(r -> !r.isStatus())
			.filter(r -> r.getType().equals(Type.valueOf("NORMAL")))
			.sorted((c1, c2) -> ((Double) c2.getRating()).compareTo(c1.getRating()))
			.sorted((c1, c2) -> c1.getTime().compareTo(c2.getTime()))
			.collect(Collectors.toList());
	}

	// Utility method to calculate distance using Google Maps Distance Matrix API
	private double calculateDistanceFromGoogleAPI(String origin, String destination) {
		try {
			String apiKey = "AIzaSyCAI_95oRUs7Pp8woFcyy3bkXpQ882Zt4Y";
			String url = String.format(
				"https://maps.googleapis.com/maps/api/distancematrix/json?origins=%s&destinations=%s&key=%s",
				origin.replace(" ", "+"), destination.replace(" ", "+"), apiKey
			);

			// Make HTTP request
			HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
			connection.setRequestMethod("GET");

			BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String inputLine;
			StringBuilder response = new StringBuilder();
			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
			in.close();

			// Parse JSON response
			JSONObject jsonResponse = new JSONObject(response.toString());
			JSONArray rows = jsonResponse.getJSONArray("rows");
			if (rows.length() > 0) {
				JSONObject elements = rows.getJSONObject(0).getJSONArray("elements").getJSONObject(0);
				if (elements.getString("status").equals("OK")) {
					double distanceInMeters = elements.getJSONObject("distance").getDouble("value");
					return distanceInMeters / 1000; // Convert meters to kilometers
				}
			}
		} catch (Exception e) {
			System.err.println("Error calculating distance from Google API: " + e.getMessage());
		}
		return Double.MAX_VALUE; // Return a large value if distance cannot be calculated
	}
	
	@Override
	public List<RideDto> findSubsRides(FindRideDto findRide) {
		String source = findRide.getSource();
		String dest = findRide.getDest();
		LocalDate time = findRide.getDate();
		
		List<Rides> list =rideRepo.findRideByDetials(source,dest,time);
		List<RideDto> dtoList = new ArrayList<RideDto>();
		for(int i=0;i<list.size();i++) {
			RideDto dtoObj = new RideDto(list.get(i).getRid(),list.get(i).getSource(),list.get(i).getDest(),list.get(i).getDate(),list.get(i).getTime(),list.get(i).getCharges(),list.get(i).getType(),list.get(i).getDriver().getRatings(),list.get(i).isStatus(),list.get(i).getDriver().getDid());
			dtoList.add(dtoObj);
		}
		
		
		return dtoList.stream()
				.filter(r->r.isStatus()==false)
				.filter(r->r.getType().equals(Type.valueOf("SUBSCRIPTION_RIDE")))
				.sorted((c1,c2)->((Double)c2.getRating()).compareTo(c1.getRating())).collect(Collectors.toList());
		
	}
	
	@Override
	public Driver confirmDriverDetails(Integer rid) {
		Rides ride = rideRepo.getById(rid);
		return ride.getDriver();
	}

	@Override
	public Rides returnRide(Integer rid) {
		// TODO Auto-generated method stub
		return rideRepo.findById(rid).orElseThrow(()->new RuntimeException("Ride Not found"));
	}
	
	@Override
	public Rides findRides(Integer rid) {
		return rideRepo.findById(rid).orElseThrow(()->new RuntimeException("Ride Not Found"));
	}

	@Override
	public RideDetailsDto returnRideDetails(Integer rid) {
		Rides ride = rideRepo.findById(rid).orElseThrow(() -> new RuntimeException("Ride Not found"));
		String driverName = "";
		long driverPhone = 0;
		if (ride.getDriver() != null && ride.getDriver().getUser() != null) {
			driverName = ride.getDriver().getUser().getName();
			driverPhone = ride.getDriver().getUser().getMobile();
		}
		return new RideDetailsDto(
			ride.getRid(),
			ride.getSource(),
			ride.getDest(),
			ride.getCharges(),
			ride.getTime(),
			ride.getDate(),
			driverName,
			driverPhone
		);
	}
}
