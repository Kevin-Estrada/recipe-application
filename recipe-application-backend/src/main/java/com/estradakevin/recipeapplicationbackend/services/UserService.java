package com.estradakevin.recipeapplicationbackend.services;

import java.util.List;

import com.estradakevin.recipeapplicationbackend.dto.UserDto;

public interface UserService {

    // Return a list of users
    List<UserDto> getAllUsers();

    // Return a user by id
    UserDto getUserById(Long id);

    // Create a new user
    UserDto createUser(UserDto userDto);

    // Update a user
    UserDto updateUser(Long id, UserDto userDto, boolean changePasswordFlag);

    // Delete a user
    void deleteUserById(Long id);
}
