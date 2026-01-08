package com.sumanth.library_reservation.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sumanth.library_reservation.entity.Book;
import com.sumanth.library_reservation.entity.Reservation;
import com.sumanth.library_reservation.entity.User;
import com.sumanth.library_reservation.repo.BookRepository;
import com.sumanth.library_reservation.repo.UserRepository;
import com.sumanth.library_reservation.service.ReservationService;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
	private final ReservationService reservationService;
    private final UserRepository userRepo;
    private final BookRepository bookRepo;

    public ReservationController(ReservationService rs, UserRepository ur, BookRepository br) {
        this.reservationService = rs;
        this.userRepo = ur;
        this.bookRepo = br;
    }

    @PostMapping("/reserve")
    public ResponseEntity<?> reserveBook(@RequestParam Long userId, @RequestParam String bookId) {
        try {
            Reservation r = reservationService.reserveBook(userId, bookId);
            return ResponseEntity.ok(r);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
	

    @GetMapping("/user/{userId}")
    public List<Reservation> getUserReservations(@PathVariable Long userId) {
        return reservationService.getUserReservations(userId);
    }

    @PostMapping("/cancel/{id}")
    public void cancel(@PathVariable Long id) {
        reservationService.cancel(id);
    }
}
