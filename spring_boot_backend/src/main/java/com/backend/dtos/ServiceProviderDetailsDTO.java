package com.backend.dtos;

import java.util.List;

import com.backend.entities.GovIdType;
import com.backend.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ServiceProviderDetailsDTO {

    private Long serviceProviderId;

    // User info
    private String firstName;
    private String lastName;
    private String address;
    private String email;
    private Role role;
    private String phone;
    private String profileImage;

    // Provider info
    private String certification;
    private String govId;
    private GovIdType govIdType;
    private boolean verificationStatus;

    // ✅ Documents (MULTIPLE)
    private List<String> documentUrls;
}
