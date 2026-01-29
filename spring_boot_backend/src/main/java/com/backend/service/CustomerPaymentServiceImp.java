package com.backend.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.backend.dtos.PaymentOrderResponseDTO;
import com.backend.dtos.PaymentVerifyDTO;
import com.backend.entities.Booking;
import com.backend.entities.Payment;
import com.backend.entities.PaymentMethod;
import com.backend.entities.PaymentStatus;
import com.backend.repository.BookingRepository;
import com.backend.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;


@Service
@Transactional
@RequiredArgsConstructor
public class CustomerPaymentServiceImp implements CustomerPaymentService{
	
	public final PaymentRepository paymentRepository;
	public final BookingRepository bookingRepository;

    @Value("${razorpay.key.id}")
    private String razorpayKey;

    @Value("${razorpay.key.secret}")
    private String razorpaySecret;

    private RazorpayClient razorpayClient;

    @PostConstruct
    public void init() throws RazorpayException {
        razorpayClient = new RazorpayClient(razorpayKey, razorpaySecret);
    }

    public PaymentOrderResponseDTO createOrder(Long bookingId, double amount)
            throws RazorpayException {

        JSONObject options = new JSONObject();
        options.put("amount", (int) (amount * 100));
        options.put("currency", "INR");
        options.put("receipt", "booking_" + bookingId);

        Order order = razorpayClient.orders.create(options);
        //System.out.println("razorpayKey:"+razorpayKey+"\n razorpaySecret:"+razorpaySecret+options.toString()+order.toString());
        return new PaymentOrderResponseDTO(
        	    order.get("id").toString(),          // String
        	    order.get("currency").toString(),       // Integer
        	    (Integer) order.get("amount"),    // String
        	    razorpayKey
        	);
    }
    
    
    @Override
    public void verifyPayment(PaymentVerifyDTO dto) {

        try {
            // Step 1: Generate signature
            String payload =
                dto.getRazorpayOrderId() + "|" + dto.getRazorpayPaymentId();

            String generatedSignature =
                hmacSha256(payload, razorpaySecret);

            // Step 2: Compare signatures
            if (!generatedSignature.equals(dto.getRazorpaySignature())) {
                throw new RuntimeException("Invalid payment signature");
            }

            // Step 3: Save payment in DB
            Booking booking = bookingRepository.findById(dto.getBookingId())
                    .orElseThrow(() -> new RuntimeException("Booking not found"));

            Payment payment = new Payment();
            payment.setBooking(booking);
            payment.setAmount(dto.getAmount());
            payment.setMethod(PaymentMethod.RAZORPAY);
            payment.setTransactionId(dto.getRazorpayPaymentId());
            payment.setStatus(PaymentStatus.SUCCESS);

            paymentRepository.save(payment);

        } catch (Exception e) {
            throw new RuntimeException("Payment verification failed");
        }
    }
    
    
    private String hmacSha256(String data, String secret) throws Exception {
        Mac sha256Hmac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey =
                new SecretKeySpec(secret.getBytes(), "HmacSHA256");

        sha256Hmac.init(secretKey);
        byte[] hash = sha256Hmac.doFinal(data.getBytes());

        return Base64.getEncoder().encodeToString(hash);
    }


}
