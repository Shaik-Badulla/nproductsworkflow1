package com.ensar.mapper;

import org.mapstruct.Mapper;


import com.ensar.entity.ModuleParam;
import com.ensar.request.dto.CreateUpdateModuleDto;
import com.ensar.request.dto.CreateUpdateModuleParamDto;

@Mapper(componentModel = "spring")
public interface ModuleParamMapper {

  CreateUpdateModuleParamDto entityToRequest(ModuleParam entity);

  ModuleParam requestToEntity(CreateUpdateModuleParamDto api);


}