package com.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.dtos.ServiceCategoryDTO;
import com.backend.repository.ServiceCategoryRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ServiceCategoryServiceImpl 
        implements ServiceCategoryService {

    private final ServiceCategoryRepository categoryRepository;

    @Override
    public List<ServiceCategoryDTO> getAllCategories() {
        return categoryRepository.findAll()
            .stream()
            .map(c -> new ServiceCategoryDTO(
                c.getId(),
                c.getName()
            ))
            .toList();
    }
}
