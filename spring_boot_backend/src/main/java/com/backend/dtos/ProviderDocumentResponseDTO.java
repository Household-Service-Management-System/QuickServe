package com.backend.dtos;

import com.backend.entities.ProviderDocumentType;
import com.backend.entities.VerificationStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProviderDocumentResponseDTO {

    private Long id;
    private ProviderDocumentType documentType;
    private String documentUrl;
    private VerificationStatus verificationStatus;
    private String rejectionReason;
}
