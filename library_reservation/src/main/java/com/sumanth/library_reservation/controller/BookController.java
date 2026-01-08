package com.sumanth.library_reservation.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sumanth.library_reservation.entity.Book;
import com.sumanth.library_reservation.repo.BookRepository;
import com.sumanth.library_reservation.service.BookService;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    private final BookService bookService;
    private final BookRepository bookRepo;

    public BookController(BookService bookService, BookRepository bookRepo) {
        this.bookService = bookService;
        this.bookRepo = bookRepo;
    }

    @GetMapping("/books")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.findAll();
        return ResponseEntity.ok(books);
    }

    @PostMapping("/add-book")
    public ResponseEntity<?> addBook(@RequestBody Book book) {
        String trimmedId = book.getBookId() != null ? book.getBookId().trim() : null;

        if (trimmedId == null || trimmedId.isEmpty()) {
            return ResponseEntity.badRequest().body("Book ID is required");
        }
        if (bookRepo.existsById(trimmedId)) {
        	System.out.println("Incoming Book ID: '" + book.getBookId() + "'");
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Book ID must be unique");
        }

        book.setBookId(trimmedId);
        book.setAvailableCopies(book.getTotalCopies());
        Book savedBook = bookService.save(book);
        return ResponseEntity.ok(savedBook);
    }

    @PutMapping("/update/{bookId}")
    public ResponseEntity<?> updateBook(@PathVariable String bookId, @RequestBody Book book) {
        return bookService.updateBook(bookId, book);
    }
    
    @DeleteMapping("/delete/{bookId}")
    public ResponseEntity<Void> deleteBook(@PathVariable String bookId) {
        bookService.deleteBook(bookId.trim());
        return ResponseEntity.noContent().build();
    }
}
