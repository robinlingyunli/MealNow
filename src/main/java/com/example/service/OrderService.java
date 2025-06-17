package com.example.service;

import java.util.List;

import com.stripe.exception.StripeException;
import com.example.Exception.CartException;
import com.example.Exception.OrderException;
import com.example.Exception.RestaurantException;
import com.example.Exception.UserException;
import com.example.model.Order;
import com.example.model.PaymentResponse;
import com.example.model.User;
import com.example.request.CreateOrderRequest;

public interface OrderService {
	
	 public PaymentResponse createOrder(CreateOrderRequest order, User user) throws UserException, RestaurantException, CartException, StripeException;
	 
	 public Order updateOrder(Long orderId, String orderStatus) throws OrderException;
	 
	 public void cancelOrder(Long orderId) throws OrderException;
	 
	 public List<Order> getUserOrders(Long userId) throws OrderException;
	 
	 public List<Order> getOrdersOfRestaurant(Long restaurantId,String orderStatus) throws OrderException, RestaurantException;
	 

}
