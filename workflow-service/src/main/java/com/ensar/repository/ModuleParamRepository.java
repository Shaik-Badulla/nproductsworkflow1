package com.ensar.repository;


import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ensar.entity.ModuleParam;

@Repository
public interface ModuleParamRepository extends JpaRepository<ModuleParam, Long> {

	boolean existsByName(String name);

	

}