package com.estradakevin.recipeapplicationbackend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.estradakevin.recipeapplicationbackend.models.User;

@Service
public class UserService {
    private final List<User> users;

    public UserService() {
        users = new ArrayList<>();
        users.add(new User(1L, "Kevin", "Estrada", "kestrad", "kestrad@gmail.com", "testPassword123"));
        users.add(new User(2L, "Ricardo", "Serrato", "rserrato", "rserrato@gmail.com", "testPassword12345"));
        users.add(new User(3L, "Ana", "Garza", "agarza", "agarza@gmail.com", "testPassword1234567"));
        users.add(new User(4L, "Bob", "Builder", "bbuilder", "bbuilder@gmail.com", "testPassword123456789"));
    }

    // Return a list of users
    public List<User> getAllUsers() {
        return this.users;
    }

    // Return a user by id
    public User getUserById(Long id) {
        return users.stream().filter(u -> u.getUserId() == id).findFirst().get();
    }

    // Create a new user
    public String createUser(User user) {
        boolean userAdded = users.add(user);
        if (userAdded) {
            return "User has been added successfully";
        } else {
            return "User was not added successfully";
        }
    }

    // Update a user
    public String updateUser(Long id, User user) {
        boolean userRemoved = users.removeIf(u -> u.getUserId() == id);
        if (userRemoved) {
            this.users.add(user);
            return "User was updated successfully";
        } else {
            return "User was not updated successfully";
        }
    }

    // Delete a user
    public String deleteUserById(Long id) {
        boolean isRemoved = this.users.removeIf(u -> u.getUserId() == id);
        if (isRemoved) {
            return "User was removed successfully";
        } else {
            return "User was not removed successfully";
        }
    }
}
