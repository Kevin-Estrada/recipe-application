package com.estradakevin.recipeapplicationbackend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.estradakevin.recipeapplicationbackend.models.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserName(String userName);

    Optional<User> findByUserNameOrEmail(String username, String email);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);

    boolean existsByUserId(Long userId);
}
