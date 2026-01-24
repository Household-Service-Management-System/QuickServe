package com.backend.entities;


import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "system_logs")
@Getter
@Setter
@AttributeOverride(name = "id", column = @Column(name = "log_id"))
public class SystemLog extends BaseEntity{
	
	    // Who performed the action (user / admin / provider)
	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "actor_id", nullable = false)
	    private User actor;

	    @Column(nullable = false)
	    private String action;   // CREATE_BOOKING, UPDATE_STATUS, LOGIN, PAYMENT_SUCCESS

	    @Column(name = "entity_name", nullable = false)
	    private String entityName;   // BOOKING, PAYMENT, USER

	    @Column(name = "entity_id", nullable = true)
	    private Long entityId;

//	    @Column(name = "ip_address", nullable = true)
//	    private String ipAddress;

}
