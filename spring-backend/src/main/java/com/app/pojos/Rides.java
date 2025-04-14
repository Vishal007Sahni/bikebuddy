package com.app.pojos;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name="rides_tbl")
public class Rides {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer rid;
	@Column(length=255)
	private String source;
	@Column(length=255)
	private String dest;
	private LocalDate date;
	private LocalTime time;
	private double charges;
	@Enumerated(EnumType.STRING)
	private Type type;
	private boolean status;
	@JsonIgnore //added
	@ManyToOne
	@JoinColumn(name="did")
	private Driver driver;
	@JsonIgnore
	@OneToOne(mappedBy = "rides",fetch = FetchType.LAZY,orphanRemoval = true, cascade = CascadeType.ALL)
	private Payment pid;
	
	
	
	public Rides(Integer rid, String source, String dest, LocalDate date, double charges, boolean status) {
		super();
		this.rid = rid;
		this.source = source;
		this.dest = dest;
		this.date = date;
		this.charges = charges;
		this.status = status;
		
	}

	public Rides(String source, String dest, LocalDate date, LocalTime time,double charges,Type type) {
		super();
		this.source = source;
		this.dest = dest;
		this.date = date;
		this.charges = charges;
		this.type = type;
		this.time = time;
		
	}
}
