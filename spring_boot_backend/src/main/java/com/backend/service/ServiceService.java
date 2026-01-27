package com.backend.service;

import com.backend.dtos.ServiceDTO;
import com.backend.dtos.ServiceUpdateDTO;

public interface ServiceService {
    ServiceDTO getServiceById(Long serviceId);
    void updateService(Long serviceId, ServiceUpdateDTO dto);
}
