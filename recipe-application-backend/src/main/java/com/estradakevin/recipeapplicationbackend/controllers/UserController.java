package com.estradakevin.recipeapplicationbackend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.estradakevin.recipeapplicationbackend.models.User;
import com.estradakevin.recipeapplicationbackend.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET
    @RequestMapping()
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @RequestMapping("{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // POST
    @RequestMapping(value = "createUser", method = RequestMethod.POST)
    public String createNewUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // PUT
    @RequestMapping(value = "updateUser/{id}", method = RequestMethod.PUT)
    public String updateUserById(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    // DELETE
    @RequestMapping(value = "removeUser/{id}", method = RequestMethod.DELETE)
    public String deleteUserById(@PathVariable Long id) {
        return userService.deleteUserById(id);
    }
}
