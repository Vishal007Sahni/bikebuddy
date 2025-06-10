package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.app.pojos.User;

@Repository
public interface IUserRepo extends JpaRepository<User, Integer> {

	@Query(value="select * from user_tbl a where a.email=:email and a.pwd=:pwd",nativeQuery = true)
	public User findByEmailAndPassword(String email,String pwd);
	
	@Query(value="select email from user_tbl a where a.email=:email and a.role=:role",nativeQuery=true)
	public String findByEmail(String email,String role);

	boolean existsByCollegeUniqueIdIgnoreCase(String collegeUniqueId);
	
}
