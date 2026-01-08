package com.sumanth.library_reservation.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sumanth.library_reservation.entity.Book;
import com.sumanth.library_reservation.entity.Reservation;
import com.sumanth.library_reservation.entity.User;
import com.sumanth.library_reservation.repo.BookRepository;
import com.sumanth.library_reservation.repo.ReservationRepository;
import com.sumanth.library_reservation.repo.UserRepository;

@Service
public class ReservationService {
	private final ReservationRepository reservationRepo;
	private final BookRepository bookRepo;
	private final UserRepository userRepo;

	public ReservationService(ReservationRepository reservationRepo, BookRepository bookRepo,UserRepository userRepo) {
		this.reservationRepo = reservationRepo;
		this.bookRepo = bookRepo;
		this.userRepo = userRepo;
	}
	
	public Reservation reserveBook(Long userId, String bookId) {
	    Book book = bookRepo.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
	    User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

	    if (book.getAvailableCopies() <= 0) {
	        throw new RuntimeException("No copies available");
	    }

	    Reservation reservation = new Reservation();
	    reservation.setUser(user);
	    reservation.setBook(book);
	    reservation.setStatus("CONFIRMED"); // ✅ Auto-confirm if available
	    reservation.setBookingDate(LocalDateTime.now());
	    reservation.setExpiryDate(LocalDateTime.now().plusDays(7));

	    book.setAvailableCopies(book.getAvailableCopies() - 1); // ✅ Reduce count
	    bookRepo.save(book);
	    return reservationRepo.save(reservation);
	}


	public List<Reservation> getUserReservations(Long userId) {
		return reservationRepo.findByUserId(userId);
	}

	public void cancel(Long id) {
		Reservation r = reservationRepo.findById(id).orElseThrow();
		r.setStatus("CANCELED");

		Book book = r.getBook();
		book.setAvailableCopies(book.getAvailableCopies() + 1);
		bookRepo.save(book);

		reservationRepo.save(r);
	}

	public void expireReservations() {
		List<Reservation> expired = reservationRepo.findByStatusAndExpiryDateBefore("PENDING", LocalDateTime.now());
		for (Reservation r : expired) {
			r.setStatus("EXPIRED");
			Book book = r.getBook();
			book.setAvailableCopies(book.getAvailableCopies() + 1);
			bookRepo.save(book);
		}
		reservationRepo.saveAll(expired);
	}
}
