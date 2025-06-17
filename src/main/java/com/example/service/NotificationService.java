package com.example.service;

import java.util.List;

import com.example.model.Notification;
import com.example.model.Order;
import com.example.model.Restaurant;
import com.example.model.User;

public interface NotificationService {
	
	public Notification sendOrderStatusNotification(Order order);
	public void sendRestaurantNotification(Restaurant restaurant, String message);
	public void sendPromotionalNotification(User user, String message);
	
	public List<Notification> findUsersNotification(Long userId);

}
