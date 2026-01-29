
package com.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "dispute_responses")
@Getter
@Setter
@ToString
@AttributeOverride(name = "id", column = @Column(name = "dispute_response_id"))
public class DisputeResponse extends BaseEntity {

    // Each dispute will have only ONE admin response
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dispute_id", nullable = false, unique = true)
    private Dispute dispute;

    @Column(name = "admin_response", nullable = false, length = 1000)
    private String adminResponse;

    

}
