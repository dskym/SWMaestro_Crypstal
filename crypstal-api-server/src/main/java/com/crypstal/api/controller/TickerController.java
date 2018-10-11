package com.crypstal.api.controller;

import java.time.LocalDateTime;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crypstal.api.exchange.AbstractExchangeService;
import com.crypstal.api.exchange.ExchangeServiceFactoryBean;
import com.crypstal.api.model.Ticker;
import com.crypstal.gson.typeadapter.LocalDateTimeTypeAdapter;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Controller
@RequestMapping(path="/v1/ticker", produces = "application/json; charset=utf-8")
public class TickerController {
	
	public static Logger logger = Logger.getLogger(TickerController.class);
	
	@Autowired
	private ExchangeServiceFactoryBean exchangeFactoryBean;
	
	@GetMapping
	@ResponseBody
	public ResponseEntity<String> ticker(
			@RequestParam(value="exchange", required=false, defaultValue="upbit") String exchange,
			@RequestParam(value="baseCurrency", required=false) String base,
			@RequestParam(value="cryptoCurrency", required=false) String crypto) 
					throws Exception {
		
		// 생성자로 Gson 초기화 코드 옮길 것. ///////////
		final GsonBuilder gsonBuilder = new GsonBuilder();
	    gsonBuilder.registerTypeAdapter(LocalDateTime.class, new LocalDateTimeTypeAdapter());
	    gsonBuilder.setPrettyPrinting();
	    final Gson gson = gsonBuilder.create();
	    ////////////////////////////////////////////////
		
		exchange = exchange.toUpperCase();
		exchangeFactoryBean.setExchangeName(exchange);
		AbstractExchangeService exchangeInstance = exchangeFactoryBean.getObject();
		//TODO baseCurrency와 cryptoCurrency를 파라미터로 받아 그 것만 티커로 표현
		Ticker ticker = exchangeInstance.getTicker(base, crypto);
	    return new ResponseEntity<String>(gson.toJson(ticker), HttpStatus.OK);
	}
}
