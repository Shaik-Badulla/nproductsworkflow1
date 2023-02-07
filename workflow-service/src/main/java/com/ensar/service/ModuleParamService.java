package com.ensar.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ensar.entity.ModuleParam;
import com.ensar.entity.ModuleParamType;
import com.ensar.exception.InvalidInputException;
import com.ensar.repository.ModuleParamRepository;
import com.ensar.request.dto.CreateUpdateModuleParamDto;

@Service
public class ModuleParamService {
	
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	private ModuleParamRepository moduleParamRepository;

	
	@Autowired
	public ModuleParamService(ModuleParamRepository moduleParamRepository) {
		this.moduleParamRepository = moduleParamRepository;

	}

	public ModuleParam getModuleParamById(Long id) {
		
		Optional<ModuleParam> moduleParamOptional = moduleParamRepository.findById(id);

		if (!moduleParamOptional.isPresent())
			throw new RuntimeException("Module Param Optional with " + id + " not found.");
		return moduleParamOptional.get();
	}

	public List<ModuleParam> getAllModuleParams() {
		List<ModuleParam> list = moduleParamRepository.findAll();

		return list;
	}

	public ModuleParam createOrUpdateModuleParam(Optional<Long> moduleParamId, CreateUpdateModuleParamDto createUpdateModuleParamDto) {
		ModuleParam moduleParam;
		if (moduleParamId.isPresent()) {
			moduleParam = moduleParamRepository.getById(moduleParamId.get());
			if (moduleParam == null)
				throw new RuntimeException("moduleParam with id " + moduleParamId.get() + " not found");
		} else {
			moduleParam = new ModuleParam();
			if (moduleParamRepository.existsByName(createUpdateModuleParamDto.getName()))
				throw new RuntimeException(
						"ModuleParamDto with name " + createUpdateModuleParamDto.getName() + " already exists.");
		}
		moduleParam = moduleParamRepository.save(moduleParam);
		return moduleParam;
	}

	public void delete(final Long id) throws InvalidInputException {

		Optional<ModuleParam> moduleParamEntity = moduleParamRepository.findById(id);

		if (moduleParamEntity.isEmpty())
			throw new InvalidInputException("Invalid Lead id: " + id);

		moduleParamRepository.deleteById(id);
	}

}