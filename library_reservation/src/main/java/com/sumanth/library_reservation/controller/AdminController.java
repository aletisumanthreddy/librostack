package com.sumanth.library_reservation.controller;

import java.util.List;

import org.hibernate.annotations.Where;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sumanth.library_reservation.entity.Reservation;
import com.sumanth.library_reservation.entity.Role;
import com.sumanth.library_reservation.entity.User;
import com.sumanth.library_reservation.repo.ReservationRepository;
import com.sumanth.library_reservation.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	private final UserService userService;
    private final ReservationRepository reservationRepo;

    public AdminController(UserService us, ReservationRepository rr) {
        this.userService = us;
        this.reservationRepo = rr;
    }

    @GetMapping("/users")
    public List<User> listUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/reservations")
    public List<Reservation> listReservations() {
        return reservationRepo.findAll();
    }

    @PostMapping("/register-librarian")
    public ResponseEntity<?> registerLibrarian(@RequestBody User librarian) {
        librarian.setRole(Role.LIBRARIAN);
        return userService.registerUser(librarian); 
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id); 
    }

}
