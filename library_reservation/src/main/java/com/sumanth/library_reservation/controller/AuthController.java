package com.sumanth.library_reservation.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sumanth.library_reservation.entity.User;
import com.sumanth.library_reservation.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    // 🔐 Login user
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User dbUser = userService.findByEmail(loginRequest.getEmail());

        if (dbUser == null || !dbUser.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("❌ Invalid email or password");
        }

        return ResponseEntity.ok(dbUser);
    }
}
