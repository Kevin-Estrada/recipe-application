package com.estradakevin.recipeapplicationbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.estradakevin.recipeapplicationbackend.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
