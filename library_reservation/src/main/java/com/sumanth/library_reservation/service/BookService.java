package com.sumanth.library_reservation.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sumanth.library_reservation.entity.Book;
import com.sumanth.library_reservation.repo.BookRepository;
import com.sumanth.library_reservation.repo.ReservationRepository;

@Service
public class BookService {
	private final BookRepository bookRepo;
	private final ReservationRepository reservationRepo;
    public BookService(BookRepository bookRepo ,ReservationRepository reservationRepo) {
        this.bookRepo = bookRepo;
		this.reservationRepo = reservationRepo;
    }

    public Book save(Book book) {
        return bookRepo.save(book);
    }

    public List<Book> findAll() {
        return bookRepo.findAll();
    }

    public ResponseEntity<?> updateBook(String bookId, Book updatedBook) {
        Optional<Book> optionalBook = bookRepo.findByBookId(bookId);
        if (optionalBook.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Book not found: " + bookId);
        }

        Book book = optionalBook.get();
        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());
        book.setTotalCopies(updatedBook.getTotalCopies());
        book.setAvailableCopies(updatedBook.getAvailableCopies());

        return ResponseEntity.ok(bookRepo.save(book));
    }

    public ResponseEntity<?> deleteBook(String bookId) {
        Optional<Book> optionalBook = bookRepo.findByBookId(bookId);
        if (optionalBook.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Book not found: " + bookId);
        }

        Book book = optionalBook.get();

        // Check if book is reserved
        boolean isReserved = reservationRepo.existsByBook_BookIdAndStatus(bookId, "ACTIVE");
        if (isReserved) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("❌ Cannot delete: Book is currently reserved.");
        }

        bookRepo.delete(book);
        return ResponseEntity.ok("✅ Book deleted: " + bookId);
    }
}
