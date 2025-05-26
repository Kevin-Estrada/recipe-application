package com.estradakevin.recipeapplicationbackend.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.estradakevin.recipeapplicationbackend.dto.UserDto;
import com.estradakevin.recipeapplicationbackend.exception.ResourceNotFoundException;
import com.estradakevin.recipeapplicationbackend.mappers.UserMapper;
import com.estradakevin.recipeapplicationbackend.models.Recipe;
import com.estradakevin.recipeapplicationbackend.models.User;
import com.estradakevin.recipeapplicationbackend.repositories.RecipeRepository;
import com.estradakevin.recipeapplicationbackend.repositories.UserRepository;
import com.estradakevin.recipeapplicationbackend.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepositiory;

    public UserServiceImpl(UserRepository userRepositiory) {
        this.userRepositiory = userRepositiory;
    }

    // Return a list of users
    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepositiory.findAll();
        return users.stream().map(user -> UserMapper.mapToUserDto(user)).collect(Collectors.toList());
    }

    // Return a user by id
    @Override
    public UserDto getUserById(Long id) {
        User user = userRepositiory.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return UserMapper.mapToUserDto(user);
    }

    // Create a new user
    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.mapToUser(userDto);
        if (userRepositiory.existsByUserName(user.getUserName())) {
            throw new ResourceNotFoundException("User with username " + user.getUserName() + " already exists.");
        } else if (userRepositiory.existsByEmail(user.getEmail())) {
            throw new ResourceNotFoundException("User with email " + user.getEmail() + " already exists.");
        } else {
            userRepositiory.save(user);
        }
        return UserMapper.mapToUserDto(user);
    }

    // Update a user
    @Override
    public UserDto updateUser(Long userId, UserDto userDto, boolean changePasswordFlag) {
        User user = userRepositiory.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        if (changePasswordFlag) {
            user.setPassword(userDto.getPassword());
        }
        userRepositiory.save(user);
        return UserMapper.mapToUserDto(user);
    }

    // Delete a user
    @Override
    public void deleteUserById(Long userId) {
        User user = userRepositiory.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        System.out.println("Getting into the print statement");
        if (user.getPassword() == null) {
            user.setPassword("test1234");
        }
        userRepositiory.delete(user);
    }
}
