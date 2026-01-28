package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.PaymentOrderRequestDTO;
import com.backend.dtos.PaymentVerifyDTO;
import com.backend.service.CustomerPaymentService;
import com.backend.service.CustomerService;
import com.razorpay.RazorpayException;

import lombok.RequiredArgsConstructor;

@RestController   // ✅ use RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final CustomerPaymentService customerPaymentService;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(
            @RequestBody PaymentOrderRequestDTO req
    ) throws RazorpayException {

        return ResponseEntity.ok(
            customerPaymentService.createOrder(
                req.getBookingId(),
                req.getAmount()
            )
        );
    }
    
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody PaymentVerifyDTO dto) {
        customerPaymentService.verifyPayment(dto);
        return ResponseEntity.ok("Payment verified successfully");
    }

}

