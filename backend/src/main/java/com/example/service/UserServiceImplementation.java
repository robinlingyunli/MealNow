package com.example.service;


import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Exception.UserException;
import com.example.config.JwtProvider;
import com.example.model.Address;
import com.example.model.User;
import com.example.repository.AddressRepository;
import com.example.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService {


	private UserRepository userRepository;
	private JwtProvider jwtProvider;
	private PasswordEncoder passwordEncoder;
	private AddressRepository addressRepository;

	public UserServiceImplementation(
			UserRepository userRepository,
			JwtProvider jwtProvider,
			PasswordEncoder passwordEncoder,
			AddressRepository addressRepository
	)
	{
		this.userRepository = userRepository;
		this.jwtProvider = jwtProvider;
		this.passwordEncoder = passwordEncoder;
		this.addressRepository = addressRepository;
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
		String email=jwtProvider.getEmailFromJwtToken(jwt);
		
		User user = userRepository.findByEmail(email);
		
		if(user==null) {
			throw new UserException("user not exist with email "+email);
		}
//		System.out.println("email user "+user.get().getEmail());
		return user;
	}

	@Override
	public List<User> findAllUsers() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

//	@Override
//	public List<User> getPenddingRestaurantOwner() {
//
//		return userRepository.getPenddingRestaurantOwners();
//	}
	
	@Override
    public void updatePassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

//	@Override
//	public void sendPasswordResetEmail(User user) {
//
//		// Generate a random token (you might want to use a library for this)
//        String resetToken = generateRandomToken();
//
//        // Calculate expiry date
//        Date expiryDate = calculateExpiryDate();
//
//        // Save the token in the database
//        PasswordResetToken passwordResetToken = new PasswordResetToken(resetToken,user,expiryDate);
//        passwordResetTokenRepository.save(passwordResetToken);
//
//        // Send an email containing the reset link
//        sendEmail(user.getEmail(), "Password Reset", "Click the following link to reset your password: http://localhost:3000/account/reset-password?token=" + resetToken);
//	}
//	private void sendEmail(String to, String subject, String message) {
//	    SimpleMailMessage mailMessage = new SimpleMailMessage();
//
//	    mailMessage.setTo(to);
//	    mailMessage.setSubject(subject);
//	    mailMessage.setText(message);
//
//	    javaMailSender.send(mailMessage);
//	}
	private String generateRandomToken() {
	    return UUID.randomUUID().toString();
	}
	private Date calculateExpiryDate() {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, 10);
        return cal.getTime();
    }
	
	@Override
	public User saveAddress(User user, Address address) {
		Address saved = addressRepository.save(address);
		user.getAddresses().add(saved);
		return userRepository.save(user);
	}

	@Override
	public User updateAddress(User user, Long addressId, Address updated) {
		Address address = addressRepository.findById(addressId)
				.orElseThrow(() -> new RuntimeException("Address not found"));
		address.setStreetAddress(updated.getStreetAddress());
		address.setCity(updated.getCity());
		address.setState(updated.getState());
		address.setPostalCode(updated.getPostalCode());
		address.setCountry(updated.getCountry());
		addressRepository.save(address);
		return userRepository.findById(user.getId()).get();
	}

	@Override
	public User deleteAddress(User user, Long addressId) {
		user.getAddresses().removeIf(a -> a.getId().equals(addressId));
		return userRepository.save(user);
	}

	@Override
	public User findUserByEmail(String username) throws UserException {
		
		User user=userRepository.findByEmail(username);
		
		if(user!=null) {
			
			return user;
		}
		
		throw new UserException("user not exist with username "+username);
	}



}
