package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerComplaintsDTO {
  Integer id;	
  String name;
  String email;
  String Complaint;
  
}
