package com.sumanth.library_reservation.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sumanth.library_reservation.entity.Role;
import com.sumanth.library_reservation.entity.User;
import com.sumanth.library_reservation.repo.UserRepository;

@Service
public class UserService {
	private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public ResponseEntity<?> registerUser(User user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("❌ Email already in use: " + user.getEmail());
        }

        User saved = userRepo.save(user);
        return ResponseEntity.ok(saved);
    }

    // Find user by email for login use
    public User findByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }

    // List all users
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    // Delete user unless ADMIN
    public ResponseEntity<?> deleteUser(Long id) {
        Optional<User> userOpt = userRepo.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ User not found with ID: " + id);
        }

        User user = userOpt.get();
        if (user.getRole() == Role.ADMIN) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("🚫 Cannot delete ADMIN users.");
        }

        userRepo.delete(user);
        return ResponseEntity.ok("✅ User deleted: " + user.getEmail());
    }

    //  Get full ResponseEntity by email (used if needed elsewhere)
    public ResponseEntity<?> getUserByEmail(String email) {
        Optional<User> optionalUser = userRepo.findByEmail(email);

        if (optionalUser.isPresent()) {
            return ResponseEntity.ok(optionalUser.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ No user found with email: " + email);
        }
    }
}
