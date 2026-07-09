package com.example.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Exception.UserException;
import com.example.model.Address;
import com.example.model.User;
import com.example.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String jwt) throws UserException {
		User user = userService.findUserProfileByJwt(jwt);
		return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
	}

	@PostMapping("/addresses")
	public ResponseEntity<User> addAddressHandler(
			@RequestHeader("Authorization") String jwt,
			@RequestBody Address address
	) throws UserException {
		User user = userService.findUserProfileByJwt(jwt);
		User updated = userService.saveAddress(user, address);
		return new ResponseEntity<>(updated, HttpStatus.CREATED);
	}

	@PutMapping("/addresses/{addressId}")
	public ResponseEntity<User> updateAddressHandler(
			@RequestHeader("Authorization") String jwt,
			@PathVariable Long addressId,
			@RequestBody Address address
	) throws UserException {
		User user = userService.findUserProfileByJwt(jwt);
		User updated = userService.updateAddress(user, addressId, address);
		return new ResponseEntity<>(updated, HttpStatus.OK);
	}

	@DeleteMapping("/addresses/{addressId}")
	public ResponseEntity<User> deleteAddressHandler(
			@RequestHeader("Authorization") String jwt,
			@PathVariable Long addressId
	) throws UserException {
		User user = userService.findUserProfileByJwt(jwt);
		User updated = userService.deleteAddress(user, addressId);
		return new ResponseEntity<>(updated, HttpStatus.OK);
	}

}
