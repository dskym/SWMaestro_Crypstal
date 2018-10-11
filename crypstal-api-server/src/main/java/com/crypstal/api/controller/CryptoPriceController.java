package com.crypstal.api.controller;


import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crypstal.api.dao.CandleDao;
import com.crypstal.api.exchange.UpbitExchangeAPI;
import com.crypstal.api.model.Candle;
import com.crypstal.api.service.CryptoPriceService;
import com.google.gson.Gson;

@CrossOrigin(origins = "localhost", maxAge = 3600)
@Controller
@RequestMapping(path="/v1/price/", produces = "application/json; charset=utf-8")
public class CryptoPriceController {
	
	public static Logger logger = Logger.getLogger(CryptoPriceController.class);
	
	@Autowired
	private CryptoPriceService cryptoPriceService;
	
	@Autowired
	private CandleDao candleDao;
	
	@Autowired
	private UpbitExchangeAPI upbitApiHelper;
	
	@SuppressWarnings("unchecked")
	@GetMapping("/{exchange}/{crypto}")
	@ResponseBody
	public ResponseEntity<String> list(@PathVariable String exchange, 
			@PathVariable String crypto, 
			@RequestParam("dateFrom") String dateFrom,
			@RequestParam("dateTo") String dateTo) throws Exception {
		
		Map<String, String> paramMap = new HashMap<String, String>();
        paramMap.put("market", "KRW-BTC");
        //paramMap.put("to", "yyyy-MM-dd'T'HH:mm:ssXXXX");
        paramMap.put("count", "200");
        
        List<Candle> candleList = new ArrayList<>();
        
        Candle candle = null;
        String market = null;
    	LocalDateTime candleDateTimeUTC = null;
    	LocalDateTime candleDateTimeKST = null;
    	long openingPrice;
    	long highPrice;
    	long lowPrice;
    	long tradePrice;
    	long timestamp;
    	long candleAccTradePrice;
    	long canldeAccTradeVolume;
    	int unit;
    	
    	Gson gson = new Gson();
    	
    	List<Map<String, Object>> result = null;
        
        for (int i = 0; i < 100; i++) {
		
	        String upbitApiResponse = upbitApiHelper.getCandles(5, paramMap);
	        
	        result = ((List<Map<String, Object>>)gson.fromJson(upbitApiResponse, (new ArrayList<Map<String, Object>>()).getClass()));
	        
	        for (Map<String, Object> item : result) {
	        	market = (String)item.get("market");
	        	candleDateTimeUTC = LocalDateTime.parse((String)item.get("candle_date_time_utc"), DateTimeFormatter.ISO_DATE_TIME);
	        	candleDateTimeKST = LocalDateTime.parse((String)item.get("candle_date_time_kst"), DateTimeFormatter.ISO_DATE_TIME);
	        	openingPrice = (long)item.get("opening_price");
	        	highPrice = (long)item.get("high_price");
	        	lowPrice = (long)item.get("low_price");
	        	tradePrice = (long)item.get("trade_price");
	        	timestamp = ((Double)item.get("timestamp")).longValue();
	        	candleAccTradePrice = (long)item.get("candle_acc_trade_price");
	        	canldeAccTradeVolume = (long)item.get("candle_acc_trade_volume");
	        	unit = ((Double)item.get("unit")).intValue();
	        	
	        	candle = new Candle(market, candleDateTimeUTC, candleDateTimeKST, openingPrice, highPrice, lowPrice, tradePrice, timestamp, candleAccTradePrice, canldeAccTradeVolume, unit);
	        	candleList.add(candle);
	        	System.out.println(candle);
	        }
	        
	        String to = candleDateTimeUTC.format(DateTimeFormatter.ISO_DATE_TIME);
	        paramMap.put("to", to.replaceAll("T", "%20"));
        }
        
        //candleDao.insertCandleList(candleList);
     
		//upbitAPIService.TestScheduler();
		
//		return new ResponseEntity<String>(
//				cryptoPriceService.getPriceAsJson(exchange, crypto, dateFrom, dateTo), 
//				HttpStatus.OK);
        return null;
	}
	
}
