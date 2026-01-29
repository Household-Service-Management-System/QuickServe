package com.backend.service;

import java.util.List;

import com.backend.dtos.ServiceDTO;
import com.backend.dtos.ServiceDetailDTO;
import com.backend.dtos.ServiceUpdateDTO;
import com.backend.dtos.ServicesFromCategoriesDTO;

public interface ServiceService {
    ServiceDTO getServiceById(Long serviceId);
    void updateService(Long serviceId, ServiceUpdateDTO dto);
    List<ServicesFromCategoriesDTO> getServicesByCategory(Long categoryId);
    ServiceDetailDTO getServiceDetails(Long serviceId);
}
