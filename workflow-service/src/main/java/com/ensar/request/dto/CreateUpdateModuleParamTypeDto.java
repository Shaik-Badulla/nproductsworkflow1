package com.ensar.request.dto;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Setter
@Getter
public class CreateUpdateModuleParamTypeDto {

		
		@NotBlank
	    private Long id;

		@NotBlank
	    @Size(max = 50)
	    private String type;
    
    
}
