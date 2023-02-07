package com.ensar.request.dto;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Setter
@Getter
public class CreateUpdateModuleDto {

	@NotBlank
    private Long moduleId;

	@NotBlank
    @Size(max = 50)
    private String textId;

	@NotBlank
    @Size(max = 50)
    private String version;

	@NotBlank
    @Size(max = 50)
    private String name;

    @Size(max = 300)
    private String description;

    @Size(max = 100)
    private String configId;

    private Boolean isSystem;

    @Size(max = 50)
    private String iconId;
    
    
}
