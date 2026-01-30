package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.dtos.CustomerDTO;
import com.backend.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	//@Query("select new com.backend.dtos.CustomerDTO(u.firstName, u.lastName, u.email, u.phone, u.street,u.city, u.state, u.pincode, u.dob, u.gender, u.lastLogin)  from User u where u.id=:user_id and u.isActive=com.backend.entities.Status.ACTIVE")
	//CustomerDTO findById(@Param("user_id") Long id);
	//User findById(Long id);
	
	@Query("SELECT u FROM User u WHERE u.id = :id")
	Optional<User> findUserByIdCustom(@Param("id") Long id);

	Optional<User> findByEmail(String email);
	
//	Yashraj
}

