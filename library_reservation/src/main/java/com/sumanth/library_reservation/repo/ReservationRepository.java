package com.sumanth.library_reservation.repo;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sumanth.library_reservation.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {
	List<Reservation> findByUserId(Long userId);
    List<Reservation> findByStatusAndExpiryDateBefore(String status, LocalDateTime time);
	boolean existsByBook_BookIdAndStatus(String bookId, String string);
}
