package com.backend.dtos;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import com.backend.entities.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DisputeFullDetailsDTO {

    /* ===================== DISPUTE ===================== */
    private Long disputeId;
    private String disputeDescription;
    private DisputeStatus disputeStatus;
    private LocalDateTime disputeCreatedOn;
    private LocalDateTime disputeUpdatedOn;

    /* ===================== CUSTOMER (Raised By) ===================== */
    private Long customerId;
    private String customerFirstName;
    private String customerLastName;
    private String customerEmail;
    private String customerPhone;
    private String customerStreet;
    private String customerCity;
    private String customerState;
    private String customerPincode;
    private LocalDate customerDob;
    private String customerGender;
    private Status customerStatus;

    /* ===================== BOOKING ===================== */
    private Long bookingId;
    private LocalDateTime scheduledAt;
    private double price;
    private BookingStatus bookingStatus;
    private String rejectionReason;

    /* ===================== SERVICE PROVIDER ===================== */
    private Long serviceProviderId;
    private GovIdType govIdType;
    private String govId;
    private boolean verificationStatus;
    private String certification;

    /* ===================== PROVIDER USER ===================== */
    private Long providerUserId;
    private String providerFirstName;
    private String providerLastName;
    private String providerEmail;
    private String providerPhone;

    /* ===================== SERVICES / SKILLS ===================== */
    private Set<ServiceDTO> services;

    /* ===================== RESOLVED BY (ADMIN) ===================== */
    private Long resolvedById;
    private String resolvedByName;
}

