package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

//	@Query("SELECT u FROM User u Where u.status='PENDING'")
//	public List<User> getPenddingRestaurantOwners();
	
	public User findByEmail(String username);

}
