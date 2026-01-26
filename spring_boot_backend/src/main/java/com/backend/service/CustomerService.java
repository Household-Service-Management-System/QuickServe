package com.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.dtos.BookingDTO;
import com.backend.dtos.BookingReqDTO;
import com.backend.dtos.CustomerDTO;
import com.backend.dtos.CustomerReqDTO;
import com.backend.dtos.PaymentDTO;
import com.backend.entities.Booking;
import com.backend.entities.BookingStatus;
import com.backend.entities.Payment;
import com.backend.entities.Status;
import com.backend.entities.User;

public interface CustomerService {

	CustomerDTO getCutomerById(Long id);

	User putCustomer(CustomerReqDTO customerReqDTO);

	List<BookingDTO> getBookingsByUser(Long id);

	BookingDTO getBookingsByBookingId(Long id);

	BookingDTO bookService(BookingReqDTO bookingReqDTO);

	BookingDTO bookingStatusChange(Long id,BookingStatus status);

	List<PaymentDTO> getPaymnetsByUser(Long id);

	PaymentDTO getPaymnetsById(Long id);

	PaymentDTO getPaymnetsByBooking(Long id);

	PaymentDTO postPaymnetsByBookingId(PaymentDTO paymentDTO);
}
