package com.backend.service;

import com.backend.dtos.PaymentOrderResponseDTO;
import com.backend.dtos.PaymentVerifyDTO;
import com.razorpay.RazorpayException;

public interface CustomerPaymentService {
	
	public PaymentOrderResponseDTO createOrder(Long bookingId, double amount)
	        throws RazorpayException;
	
	void verifyPayment(PaymentVerifyDTO dto);

}
