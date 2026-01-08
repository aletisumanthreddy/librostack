package com.sumanth.library_reservation.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sumanth.library_reservation.entity.User;

public interface UserRepository extends JpaRepository<User,Long> {
	Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
