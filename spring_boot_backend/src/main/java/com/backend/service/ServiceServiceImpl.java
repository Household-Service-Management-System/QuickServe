package com.backend.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dtos.ServiceDTO;
import com.backend.dtos.ServiceUpdateDTO;
import com.backend.dtos.ServicesFromCategoriesDTO;
import com.backend.entities.ServiceCategory;
import com.backend.entities.Status;
import com.backend.repository.ServiceCategoryRepository;
import com.backend.repository.ServiceRepository;

import jakarta.transaction.Transactional;



@Service
@Transactional
public class ServiceServiceImpl implements ServiceService {

	
	@Autowired
    private ServiceRepository serviceRepo;
	
	@Autowired
    private ServiceCategoryRepository categoryRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public ServiceDTO getServiceById(Long serviceId) {
		com.backend.entities.Service s = serviceRepo.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        return new ServiceDTO(
                s.getId(),
                s.getName(),
                s.getBasePrice(),
                s.getDuration(),
                s.getCategory().getName(),
                s.getIsAvailable().name()
        );

	}

	@Override
    public void updateService(Long serviceId, ServiceUpdateDTO dto) {

        com.backend.entities.Service service = serviceRepo.findById(serviceId)
            .orElseThrow(() -> new RuntimeException("Service not found"));

        ServiceCategory category = categoryRepo.findById(dto.getCategoryId())
            .orElseThrow(() -> new RuntimeException("Category not found"));

        service.setName(dto.getName());
        service.setBasePrice(dto.getBasePrice());
        service.setDuration(dto.getDuration());
        service.setCategory(category);
        service.setIsAvailable(Status.valueOf(dto.getIsAvailable()));

        serviceRepo.save(service);
    }

	@Override
	public List<ServicesFromCategoriesDTO> getServicesByCategory(Long categoryId) {


		List<com.backend.entities.Service> services =
			serviceRepo.findByCategory_IdAndIsAvailable(categoryId,Status.ACTIVE);

		return services.stream()
		.map(service -> modelMapper.map(service, ServicesFromCategoriesDTO.class))
		.toList();
	}
}
