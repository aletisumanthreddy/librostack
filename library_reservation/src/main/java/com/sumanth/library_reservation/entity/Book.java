package com.sumanth.library_reservation.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data@AllArgsConstructor@NoArgsConstructor
@Builder
public class Book {
	@Id
	private String bookId;
	private String title;
	private String author;
	private String isbn;
	private int totalCopies;
	private int availableCopies;
}
