package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.stripe.exception.StripeException;
import com.example.Exception.CartException;
import com.example.Exception.OrderException;
import com.example.Exception.RestaurantException;
import com.example.Exception.UserException;
import com.example.model.Order;
import com.example.model.PaymentResponse;
import com.example.model.User;
import com.example.request.CreateOrderRequest;
import com.example.service.OrderService;
import com.example.service.UserService;

@RestController
@RequestMapping("/api")
public class OrderController {
	@Autowired
	private OrderService orderService;
	@Autowired
	private UserService userService;
	
    @PostMapping("/order")
	public ResponseEntity<PaymentResponse>  createOrder(@RequestBody CreateOrderRequest order,
			@RequestHeader("Authorization") String jwt) 
					throws UserException, RestaurantException, 
					CartException, 
					StripeException,
					OrderException{
		User user=userService.findUserProfileByJwt(jwt);
		System.out.println("req user "+user.getEmail());
    	if(order!=null) {
			PaymentResponse res = orderService.createOrder(order,user);
			return ResponseEntity.ok(res);
			
    	}else throw new OrderException("Please provide valid request body");
		
    }
    
 
    
    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getAllUserOrders(@RequestHeader("Authorization") String jwt) throws OrderException, UserException {
    	User user = userService.findUserProfileByJwt(jwt);
    	if (user.getId() != null) {
    		List<Order> userOrders = orderService.getUserOrders(user.getId());
    		return ResponseEntity.ok(userOrders);
    	} else {
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    	}
    }

    @DeleteMapping("/order/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id, @RequestHeader("Authorization") String jwt)
            throws OrderException, UserException {
        User user = userService.findUserProfileByJwt(jwt);
        orderService.cancelOrder(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    

    

	
}
