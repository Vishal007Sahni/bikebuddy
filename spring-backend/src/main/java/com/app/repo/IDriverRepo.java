package com.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.dto.DriverResponse;
import com.app.pojos.Driver;

public interface IDriverRepo extends JpaRepository<Driver, Integer>{

	@Query("select new com.app.dto.DriverResponse(u.uid,u.name,u.email,u.mobile,u.adhar,d.licenseNo,d.vehicleNo,d.did,d.status,u.collegeUniqueId) from Driver d JOIN d.user u")
	public List<DriverResponse> getDriverList();
	
	@Query(value="select * from driver_tbl d where d.user_id=:id",nativeQuery = true)
	public Driver getDriver(Integer id);
	
	@Query(value="select count(*) from driver_tbl d where d.did=:did",nativeQuery=true)
	public int countRides(Integer did);
}
