package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name="user_tbl")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer uid;
	private String name;
	@Column(unique=true)
	private String email;
	private long mobile;
	private long adhar;
	private String pwd;
	private String imagepath;
	@Enumerated(EnumType.STRING)
	private Role role;
	@Column(unique = true)
	private String collegeUniqueId;

	public User(String name, String email, long mobile, long adhar, String pwd, Role role, String collegeUniqueId) {
		super();
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.adhar = adhar;
		this.pwd = pwd;
		this.role = role;
		this.collegeUniqueId = collegeUniqueId;
	}
	
		
}
