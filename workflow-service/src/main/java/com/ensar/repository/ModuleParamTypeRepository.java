package com.ensar.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ensar.entity.ModuleParamType;

@Repository
public interface ModuleParamTypeRepository extends JpaRepository<ModuleParamType, Long> {

	

}