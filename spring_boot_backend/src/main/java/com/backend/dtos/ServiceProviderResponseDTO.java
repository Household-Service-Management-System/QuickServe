package com.backend.dtos;

import com.backend.entities.GovIdType;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ServiceProviderResponseDTO {

    private Long serviceProviderId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private GovIdType govIdType;
    private String govId;
    private boolean verificationStatus;

    // JPQL constructor
    public ServiceProviderResponseDTO(
            Long serviceProviderId,
            String firstName,
            String lastName,
            String email,
            String phone,
            GovIdType govIdType,
            String govId,
            boolean verificationStatus
    ) {
        this.serviceProviderId = serviceProviderId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.govIdType = govIdType;
        this.govId = govId;
        this.verificationStatus = verificationStatus;
    }
}

