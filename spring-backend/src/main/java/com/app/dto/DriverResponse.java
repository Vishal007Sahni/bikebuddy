package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
//@AllArgsConstructor
public class DriverResponse {

	private Integer uid;
	private String name;
	private String email;
	private long mobile;
	private long adhar;
	private String vehicleNo;
	private String licenseNo;
	private Integer did;
	private boolean status;
	private String collegeUniqueId; // Add this line

	public DriverResponse(Integer uid, String name, String email, long mobile, long adhar, String vehicleNo,
			String licenseNo,Integer did,boolean status, String collegeUniqueId) {
		super();
		this.uid = uid;
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.adhar = adhar;
		this.vehicleNo = vehicleNo;
		this.licenseNo = licenseNo;
		this.did = did;
		this.status = status;
		this.collegeUniqueId = collegeUniqueId;
	}

	// Add this constructor for HQL/JPQL queries that include collegeUniqueId
	public DriverResponse(Integer uid, String name, String email, long mobile, long adhar, String vehicleNo,
			String licenseNo, Integer did, boolean status, String collegeUniqueId) {
		this.uid = uid;
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.adhar = adhar;
		this.vehicleNo = vehicleNo;
		this.licenseNo = licenseNo;
		this.did = did;
		this.status = status;
		this.collegeUniqueId = collegeUniqueId;
	}
	
	
	
	
}
