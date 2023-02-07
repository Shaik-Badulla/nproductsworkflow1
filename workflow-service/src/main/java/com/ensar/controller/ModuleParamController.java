package com.ensar.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ensar.entity.ModuleParam;
import com.ensar.exception.InvalidInputException;
import com.ensar.request.dto.CreateUpdateModuleParamDto;
import com.ensar.service.ModuleParamService;


@RestController
@Validated
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/v1/moduleparam")
public class ModuleParamController {

	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ModuleParamService moduleParamService;

	@GetMapping("/")
	@PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
	public ResponseEntity<List<ModuleParam>> getModuleParam() {
		return ResponseEntity.ok(moduleParamService.getAllModuleParams());
	}

	@PostMapping("/")
	@PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
	public ResponseEntity<ModuleParam> createModuleParam(
			@Valid @RequestBody CreateUpdateModuleParamDto createUpdateModuleParamDto) {
		return ResponseEntity.ok(moduleParamService.createOrUpdateModuleParam(Optional.empty(), createUpdateModuleParamDto));
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
	public ResponseEntity<ModuleParam> updateModuleParam(@PathVariable Long id,
			@Valid @RequestBody CreateUpdateModuleParamDto createUpdateModuleParamDto) {
		return ResponseEntity.ok(moduleParamService.createOrUpdateModuleParam(Optional.of(id), createUpdateModuleParamDto));
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
	public ResponseEntity<ModuleParam> getModuleParam(@PathVariable Long id) {
		return ResponseEntity.ok(moduleParamService.getModuleParamById(id));
	}

	@DeleteMapping("{id}")
	@PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
	public Long deleteUser(@PathVariable Long id) throws InvalidInputException {

		moduleParamService.delete(id);

		return id;
	}

}