package com.backend.entities;


import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="service_providers")
@Getter
@Setter
@AttributeOverride(name = "id", column = @Column(name = "service_provider_id"))
public class ServiceProvider extends BaseEntity{
	
	@Enumerated(EnumType.STRING)
    @Column(name = "gov_id_type", nullable = false)
    private GovIdType govIdType;
	
	@Column(name = "gov_id", nullable = false)
    private String govId;
	
	@Column(name="verification_status")
	private boolean verificationStatus;
	
	//future scope
	@Column(columnDefinition = "json",nullable=true)
	private String certification;
	
	
	//owner side of relationship 
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
	    name = "provider_skills",
	    joinColumns = @JoinColumn(name = "service_provider_id"),
	    inverseJoinColumns = @JoinColumn(name = "service_id")
	)
	private Set<Service> services = new HashSet<>();
}
