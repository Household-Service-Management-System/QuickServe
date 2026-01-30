package com.backend.service;

import java.io.IOException;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.dtos.CloudinaryUploadResult;
import com.backend.dtos.ProviderDocumentResponseDTO;
import com.backend.entities.ProviderDocumentType;
import com.backend.entities.ServiceProvider;
import com.backend.entities.ServiceProviderDocument;
import com.backend.entities.VerificationStatus;
import com.backend.repository.ServiceProviderDocumentRepository;
import com.backend.repository.ServiceProviderRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ServiceProviderDocumentServiceImpl
        implements ServiceProviderDocumentService {

    @Autowired
    private ServiceProviderRepository providerRepo;

    @Autowired
    private ServiceProviderDocumentRepository documentRepo;

    @Autowired
    private CloudinaryImageServiceImpl cloudinary;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void uploadDocument(
            Long providerId,
            ProviderDocumentType type,
            MultipartFile file) throws IOException {

        ServiceProvider provider = providerRepo.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        if (type != ProviderDocumentType.CERTIFICATION) {
            List<ServiceProviderDocument> existing =
                    documentRepo.findByServiceProviderIdAndDocumentType(providerId, type);
            documentRepo.deleteAll(existing);
        }

        CloudinaryUploadResult result = cloudinary.uploadDocument(file);

        ServiceProviderDocument doc = new ServiceProviderDocument();
        doc.setServiceProvider(provider);
        doc.setDocumentType(type);
        doc.setDocumentUrl(result.getUrl());
        doc.setPublicId(result.getPublicId());
        doc.setVerificationStatus(VerificationStatus.PENDING);

        documentRepo.save(doc);
    }


    @Override
    public List<ProviderDocumentResponseDTO> getDocuments(Long providerId) {
        return documentRepo.findByServiceProviderId(providerId)
                .stream()
                .map(d -> modelMapper.map(d, ProviderDocumentResponseDTO.class))
                .toList();
    }

    @Override
    public void deleteDocument(Long providerId, Long documentId) throws IOException {

    	ServiceProviderDocument doc = documentRepo.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        if (!doc.getServiceProvider().getId().equals(providerId)) {
            throw new RuntimeException("Unauthorized delete attempt");
        }

        cloudinary.delete(doc.getPublicId());
        documentRepo.delete(doc);
    }

}
