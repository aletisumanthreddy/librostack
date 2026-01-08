package com.sumanth.library_reservation.repo;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sumanth.library_reservation.entity.Book;

public interface BookRepository extends JpaRepository<Book,String> {
	Optional<Book> findByBookId(String bookId);
    boolean existsByBookId(String bookId);
}
