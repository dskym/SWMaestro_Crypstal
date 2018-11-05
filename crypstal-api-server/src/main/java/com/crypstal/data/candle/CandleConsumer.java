package com.crypstal.data.candle;

import java.time.Duration;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.crypstal.api.dao.CandleDao;
import com.crypstal.ta4j.MutableBaseBar;

@Service
public class CandleConsumer {
	
	@Autowired
	private CandleDao candleDao;
	
	@Autowired
	private CandleBroker candleBroker;
	
	private Map<Integer, CandleInterval> nextRequestInterval;
	
	private static int[] timePeriod = {10000, 30000, 60000, 180000};
	
	@Autowired
	public CandleConsumer(CandleBroker candleBroker) {
		nextRequestInterval = new HashMap<>();
		
		ZonedDateTime initTime = candleBroker.getInitialTime();
		
		for (int i=0; i<timePeriod.length; i++) {
			nextRequestInterval.put(timePeriod[i], new CandleInterval(timePeriod[i], initTime));
		}
	}
	
	@Scheduled(fixedDelay=5000)
	public void consume() {
		String symbol = "bithumbBTC";
		
		CandleInterval interval = null;
		for (int i=0; i<timePeriod.length; i++) {
			interval = nextRequestInterval.get(timePeriod[i]);
			MutableBaseBar candle = candleBroker.get(symbol, timePeriod[i], interval);
			
			if (candle == null) {
				continue;
			}
			
			try {
			
			switch(timePeriod[i]) {
			case 10000:
				candleDao.insertOrUpdateBithumbBTC10SEC(candle);
				break;
			case 30000:
				candleDao.insertOrUpdateBithumbBTC30SEC(candle);
				break;
			case 60000:
				candleDao.insertOrUpdateBithumbBTC1MIN(candle);
				break;
			case 180000:
				candleDao.insertOrUpdateBithumbBTC3MIN(candle);
				break;
			}
			
			} catch(Exception e) {
				e.printStackTrace();
			}
			
			//System.out.println("[" + timePeriod[i] + "] " + candle);
			
			ZonedDateTime accessDelay = interval.endTime().plus(Duration.ofMillis(1000 * 12));
			if (ZonedDateTime.now(ZoneId.of("Asia/Seoul")).isAfter(accessDelay)) {
				interval.next();
			}
		}
		System.out.println("\n");
	}
	
}
