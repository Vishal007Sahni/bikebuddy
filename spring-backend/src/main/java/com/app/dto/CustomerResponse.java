package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class CustomerResponse {

	private Integer uid;
	private String name;
	private String email;
	private long mobile;
	private long adhar;
	private Integer cid;
	private String collegeUniqueId; // Add this line

	public CustomerResponse(Integer uid, String name, String email, long mobile, long adhar, Integer cid, String collegeUniqueId) {
		super();
		this.uid = uid;
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.adhar = adhar;
		this.cid = cid;
		this.collegeUniqueId = collegeUniqueId;
	}

	// Add this constructor for HQL/JPQL compatibility (without collegeUniqueId)
	public CustomerResponse(Integer uid, String name, String email, long mobile, long adhar, Integer cid) {
		this.uid = uid;
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.adhar = adhar;
		this.cid = cid;
		// collegeUniqueId will remain null
	}
	
	
	
}
