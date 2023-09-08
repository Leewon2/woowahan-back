package com.woowahanbank.backend.domain.customer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.woowahanbank.backend.domain.customer.domain.Depositor;

public interface DepositorRepository extends JpaRepository<Depositor, Long> {
	List<Depositor> findAllByUser_FamilyIdAndAllowProductIsFalseOrderByIdDesc(Long familyId);
}
