package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.LoginDto;
import com.app.dto.UserDto;
import com.app.pojos.Customer;
import com.app.pojos.Driver;
import com.app.pojos.User;
import com.app.repo.ICustomerRepo;
import com.app.repo.IDriverRepo;
import com.app.repo.IUserRepo;
import com.app.repo.ICollegeIdRepo;

@Service
@Transactional
public class UserServiceImpl implements IUserService {
	
	@Value("${file.upload.location}")
	private String baseFolder;
	
	
	@Autowired
	private IUserRepo userRepo;
	
	@Autowired
	private IDriverRepo driverRepo;
	
	@Autowired
	private ICustomerRepo custRepo;

	@Autowired
	private ICollegeIdRepo collegeIdRepo;
	
	@Override
	public Object register(UserDto u) {
	    // Check if the college unique ID exists
	    if (!collegeIdRepo.existsByUniqueId(u.getCollegeUniqueId())) {
	        return "Invalid College Unique ID";
	    }

	    // Ensure unique collegeUniqueId for both CUSTOMER and DRIVER
	    if (userRepo.existsByCollegeUniqueIdIgnoreCase(u.getCollegeUniqueId())) {
	        return "College Unique ID already used by another user";
	    }

		User user = new User(
			u.getName(),
			u.getEmail(),
			u.getMobile(),
			u.getAdhar(),
			u.getPwd(),
			u.getRole(),
			u.getCollegeUniqueId() // Pass collegeUniqueId to User
		);
		String email = userRepo.findByEmail(u.getEmail(),u.getRole().toString());
		if(user.getEmail().equals(email))
		{
			return "User Already Exists";
		}
		else {
			userRepo.save(user);			
			return user;
		}
		
	}
	
	@Override
	public String deleteDriver(Integer did) {
		Driver driver = driverRepo.findById(did).orElseThrow(()-> new RuntimeException("Driver Not Found"));
		int userId = driver.getUser().getUid();
		driver.setUser(null);
		userRepo.deleteById(userId);
		driverRepo.deleteById(did);
		return "Driver Deleted";
	}
	
	@Override
	public String deleteCustomer(Integer cid) {
		Customer customer = custRepo.findById(cid).orElseThrow(()-> new RuntimeException("Driver Not Found"));
		int userId = customer.getUser().getUid();
		customer.setUser(null);
		userRepo.deleteById(userId);
		custRepo.deleteById(cid);
		return "Customer Deleted";
	}
	
	@Override
	public User findByEmailAndPassword(LoginDto logindto) {
		return userRepo.findByEmailAndPassword(logindto.getEmail(), logindto.getPwd());
	}

	@Override
	public void storeImage(Integer uid, MultipartFile imageFile) throws IOException {
		User user = userRepo.findById(uid).orElseThrow(()->new RuntimeException("User Not Found"));
		String completePath = baseFolder + File.separator + imageFile.getOriginalFilename();
		System.out.println("Complete Path = "+completePath);
		System.out.println("Copied no of bytes "
				+ Files.copy(imageFile.getInputStream(), Paths.get(completePath), StandardCopyOption.REPLACE_EXISTING));
		user.setImagepath(completePath);
		userRepo.save(user);
				
	}
	
	@Override
	public byte[] downloadImage(Integer uid) throws IOException {
		
		User user = userRepo.findById(uid).orElseThrow(()->new RuntimeException("User not found"));
		String path = user.getImagepath();
		return Base64.getEncoder().encode(Files.readAllBytes(Paths.get(path)));
		
	}

	
}
