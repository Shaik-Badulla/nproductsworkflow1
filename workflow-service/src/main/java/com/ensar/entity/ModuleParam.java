package com.ensar.entity;


import javax.persistence.*;

@Entity
@Table(name = "modules_params")
public class ModuleParam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "module_param_id")
    private Long moduleParamId;

    @ManyToOne
    @JoinColumn(name = "module_id")
    private Module module;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private ModuleParamType moduleParamType;

    @Column(name = "text_id", nullable = false)
    private String textId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "value")
    private String value;

    @Column(name = "required")
    private boolean required;

    @Column(name = "default_value")
    private String defaultValue;

    @Column(name = "depends_id")
    private String dependsId;

    @Column(name = "depends_value")
    private String dependsValue;

	public Long getModuleParamId() {
		return moduleParamId;
	}

	public void setModuleParamId(Long moduleParamId) {
		this.moduleParamId = moduleParamId;
	}

	public Module getModule() {
		return module;
	}

	public void setModule(Module module) {
		this.module = module;
	}

	public ModuleParamType getModuleParamType() {
		return moduleParamType;
	}

	public void setModuleParamType(ModuleParamType moduleParamType) {
		this.moduleParamType = moduleParamType;
	}

	public String getTextId() {
		return textId;
	}

	public void setTextId(String textId) {
		this.textId = textId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public boolean isRequired() {
		return required;
	}

	public void setRequired(boolean required) {
		this.required = required;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public String getDependsId() {
		return dependsId;
	}

	public void setDependsId(String dependsId) {
		this.dependsId = dependsId;
	}

	public String getDependsValue() {
		return dependsValue;
	}

	public void setDependsValue(String dependsValue) {
		this.dependsValue = dependsValue;
	}

   
}
