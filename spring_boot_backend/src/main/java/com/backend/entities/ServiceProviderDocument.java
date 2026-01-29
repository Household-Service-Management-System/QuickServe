package com.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "service_provider_documents")
@Getter
@Setter
public class ServiceProviderDocument extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_provider_id", nullable = false)
    private ServiceProvider serviceProvider;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProviderDocumentType documentType;

    @Column(nullable = false)
    private String documentUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VerificationStatus verificationStatus;

    private String rejectionReason;
}
