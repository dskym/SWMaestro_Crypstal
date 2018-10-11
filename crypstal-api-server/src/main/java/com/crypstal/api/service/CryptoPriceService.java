package com.crypstal.api.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crypstal.api.dao.CryptoPriceDao;
import com.crypstal.api.model.CryptoPrice;
import com.google.gson.Gson;


@Service
public class CryptoPriceService {
	
	@Autowired
	private CryptoPriceDao cryptoPriceDao;
	
	/**
	 * @param exchange
	 * @param dateFrom
	 * @param dateTo
	 * @return
	 * @throws Exception
	 */
	public String getPriceAsJson(String exchange,
			String crypto,
			String strDateFrom, 
			String strDateTo) throws Exception {
		
		//TODO 매개변수
		List<CryptoPrice> cryptoPriceList = cryptoPriceDao.selectCryptoPriceList();
		
		return new Gson().toJson(cryptoPriceList);
	}
	
	/**
	 * @param date
	 * @return
	 */
	public LocalDate parseDate(String date) {
		return LocalDate.now();
	}

}
