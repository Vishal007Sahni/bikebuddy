package com.app.repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Rides;

public interface IRidesRepo extends JpaRepository<Rides, Integer> {
	
	@Query("SELECT r FROM Rides r WHERE r.source = :source AND r.dest = :dest AND r.date = :date")
	List<Rides> findRideByDetials(@Param("source") String source, @Param("dest") String dest, @Param("date") LocalDate date);
	
}
