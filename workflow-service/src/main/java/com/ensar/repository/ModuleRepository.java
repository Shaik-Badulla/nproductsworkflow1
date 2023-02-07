package com.ensar.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ensar.entity.Module;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {

	

}