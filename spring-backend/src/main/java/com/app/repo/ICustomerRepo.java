package com.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.dto.CustomerResponse;
import com.app.pojos.Customer;

public interface ICustomerRepo extends JpaRepository<Customer, Integer>{

	@Query("select new com.app.dto.CustomerResponse(u.uid,u.name,u.email,u.mobile,u.adhar,c.cid,u.collegeUniqueId) from Customer c JOIN c.user u")
	public List<CustomerResponse> getCustomerList();
	
	@Query(value="select cid from cust_tbl c where c.user_id=:id",nativeQuery = true)
	public Integer getCustomerId(Integer id);
	
}
