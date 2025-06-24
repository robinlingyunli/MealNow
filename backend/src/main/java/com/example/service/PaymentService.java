package com.example.service;

import com.stripe.exception.StripeException;
import com.example.model.Order;
import com.example.model.PaymentResponse;

public interface PaymentService {
	
	public PaymentResponse generatePaymentLink(Order order) throws StripeException;

}
