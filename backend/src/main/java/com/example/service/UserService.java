package com.example.service;

import java.util.List;

import com.example.Exception.UserException;
import com.example.model.Address;
import com.example.model.User;

public interface UserService {

	public User findUserProfileByJwt(String jwt) throws UserException;

	public User findUserByEmail(String email) throws UserException;

	public List<User> findAllUsers();

//	public List<User> getPenddingRestaurantOwner();

	void updatePassword(User user, String newPassword);

	User saveAddress(User user, Address address);

	User updateAddress(User user, Long addressId, Address updated);

	User deleteAddress(User user, Long addressId);

//	void sendPasswordResetEmail(User user);

}
