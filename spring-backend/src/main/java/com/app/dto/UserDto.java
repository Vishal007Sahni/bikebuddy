package com.app.dto;

import com.app.pojos.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

	private Integer uid;
	private String name;
	private String email;
	private long mobile;
	private long adhar;
	private String pwd;
	private Role role;
	private DriverDto driverDto;
	private String collegeUniqueId; // New field for college unique ID
}
