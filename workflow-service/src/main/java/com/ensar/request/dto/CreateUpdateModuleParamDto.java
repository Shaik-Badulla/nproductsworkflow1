package com.ensar.request.dto;


import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Setter
@Getter
public class CreateUpdateModuleParamDto {

		@NotBlank
	    private Long moduleId;

		@NotBlank
	    private Long typeId;

	    @NotBlank
	    private String textId;

	    @NotBlank
	    private String name;

	    private String value;

	    @NotBlank
	    private Integer required;

	    private String defaultValue;

	    private String dependsId;

	    private String dependsValue;
    
    
}
