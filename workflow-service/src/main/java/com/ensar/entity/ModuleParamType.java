package com.ensar.entity;


import javax.persistence.*;


@Entity
@Table(name = "modules_params_types")
public class ModuleParamType {

	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;

	 public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Column(name = "type", nullable = false, length = 50)
	 private String type;

    
}
