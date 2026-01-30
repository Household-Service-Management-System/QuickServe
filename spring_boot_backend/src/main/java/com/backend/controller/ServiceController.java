package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.Booking_1_provider_detailsDTO;
import com.backend.dtos.ServiceDTO;
import com.backend.dtos.ServiceDetailDTO;
import com.backend.dtos.ServiceUpdateDTO;
import com.backend.dtos.ServicesFromCategoriesDTO;
import com.backend.entities.Service;
import com.backend.entities.Status;
import com.backend.repository.ServiceRepository;
import com.backend.service.ServiceProviderService;
import com.backend.service.ServiceService;

@RestController
@RequestMapping("/services")
public class ServiceController {

	@Autowired
	private ServiceService serviceService;
	
    @Autowired
    private ServiceRepository serviceRepository;

    private final ServiceProviderService serviceProviderService;


    public ServiceController(
    ServiceProviderService serviceProviderService
    ) {
    this.serviceProviderService = serviceProviderService;
    }
    
    @GetMapping
    public List<ServiceDTO> getAllServices() {
        return serviceRepository.findAllWithCategory()
            .stream()
            .map(s -> new ServiceDTO(
                s.getId(),
                s.getName(),
                s.getBasePrice(),
                s.getDuration(),
                s.getCategory().getName(), 
                s.getIsAvailable().name()
            ))
            .toList();
    }
    
   

    @GetMapping("/{id}")
    public ResponseEntity<ServiceDTO> getService(@PathVariable Long id) {
        return ResponseEntity.ok(serviceService.getServiceById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateService(
            @PathVariable Long id,
            @RequestBody ServiceUpdateDTO dto) {

        serviceService.updateService(id, dto);
        return ResponseEntity.ok("Service updated successfully");
    }
    
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ServicesFromCategoriesDTO>> getServicesByCategory(
    @PathVariable Long categoryId
    ) {
    return ResponseEntity.ok(
    serviceService.getServicesByCategory(categoryId)
    );
    }
    
    
    @GetMapping("/details/{serviceId}")
    public ResponseEntity<ServiceDetailDTO> getServiceDetails(
    @PathVariable Long serviceId
    ) {
    return ResponseEntity.ok(
    serviceService.getServiceDetails(serviceId)
    );
    }
    
//  Booking API to get service providers for certain service
  @GetMapping("/{serviceId}/providers")
  public ResponseEntity<List<Booking_1_provider_detailsDTO>>
  getProviders(@PathVariable Long serviceId) {


  return ResponseEntity.ok(
		  serviceProviderService.getProvidersByService(serviceId)
  );
  }
}
