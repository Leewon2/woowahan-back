package com.woowahanbank.backend.domain.financialproducts.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.woowahanbank.backend.domain.financialproducts.dto.FinancialProductsDto;
import com.woowahanbank.backend.domain.financialproducts.service.FinancialProductsService;
import com.woowahanbank.backend.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/financial")
public class FinancialProductsController {
	private final FinancialProductsService financialProductsService;

	@PostMapping
	public ResponseEntity<?> registerFinancialProducts(@RequestBody FinancialProductsDto dto) {
		try {
			financialProductsService.registerFinancialProducts(dto);
			return BaseResponse.ok(HttpStatus.OK, "금융상품 등록 성공");
		} catch (Exception e) {
			return BaseResponse.fail("금융상품 등록 실패", 400);
		}
	}

	@GetMapping("/{familyId}")
	public ResponseEntity<?> getAllProductList(@PathVariable Long familyId) {
		List<FinancialProductsDto> productDtoList = financialProductsService.getFinancialProductDtoList(familyId);
		return BaseResponse.okWithData(HttpStatus.OK, "우리 가족의 모든 금융 상품", productDtoList);
	}

	@GetMapping("/{familyId}/{productType}")
	public ResponseEntity<?> getSubProductList(@PathVariable Long familyId, String productType) {
		List<FinancialProductsDto> productDtoList = financialProductsService.getFinancialSubProductDtoList(familyId,
			productType);
		return BaseResponse.okWithData(HttpStatus.OK, "우리 가족의 특정 금융 상품 들", productDtoList);
	}
}
