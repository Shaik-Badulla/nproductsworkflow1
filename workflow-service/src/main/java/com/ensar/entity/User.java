package com.ensar.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Entity(name = "user")
@EqualsAndHashCode(callSuper = true)
public class User extends BaseEntity {

    public enum Role  { ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_USER }

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;


    @Column(name = "disabled")
    private boolean disabled;

    @Column(name = "role_name")
    @Enumerated(EnumType.STRING)
    private Role role;

   
    public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	
	public boolean isDisabled() {
		return disabled;
	}


	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}


	public Role getRole() {
		return role;
	}


	public void setRole(Role role) {
		this.role = role;
	}


	
	
	public Roles getRoleId() {
		return roleId;
	}

	public void setRoleId(Roles roleId) {
		this.roleId = roleId;
	}


    @OneToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Roles roleId;	

}
