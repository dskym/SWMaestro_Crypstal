package com.crypstal.data.candle;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.crypstal.ta4j.MutableBaseBar;

@Service
public class CandleBroker {
	
	@Autowired
	private TemporalCandleManager tempCandleManager;
	
	private static int[] timePeriod = {10000, 30000, 60000, 180000};
	
	private static int LIMIT_NUM_TEMPORAL_CANDLES = 10;
	
	private ZonedDateTime initTime;
	
	public CandleBroker() {
		this.initTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
	}
	
	/**
	 * TemporalCandleManager에 트랜잭션 데이터(time, price, volume)을 추가
	 * @param symbol
	 * @param time
	 * @param price
	 * @param volume
	 */
	public void offer(String symbol, ZonedDateTime time, double price, double volume) {
		for (int i=0; i<timePeriod.length; i++) {
			tempCandleManager.add(symbol, timePeriod[i], new Transaction(time, price, volume));
		}
		
		//test();
	}
	
	/**
	 * TemporalCandleManager로부터 symbol, timePeriod, time에 해당하는 캔들을 불러옴
	 * @param symbol
	 * @param timePeriod
	 * @param time
	 * @return
	 */
	public MutableBaseBar get(String symbol, int timePeriod, CandleInterval interval) {
		return tempCandleManager.get(symbol, timePeriod, interval);
	}
	
	@Scheduled(cron="* 0/1 * * * * ")
	public void reduceTemporalCandles() {
		tempCandleManager.reduce(LIMIT_NUM_TEMPORAL_CANDLES);
	}
	
	/**
	 * Candle 데이터가 없는 경우 전 캔들 데이터의 close price 로 보간함.
	 * 매 10초마다 바로 이전 구간의 캔들이 없는 경우 두 구간의 전 캔들의 close price로 이전 구간의 캔들을 보간. 
	 */
	@Scheduled(cron="9/10 * * * * * ")
	public void interpolate() {
		String symbol = "bithumbBTC";
		
		ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
		//System.out.println("Check empty candles. " + initTime +" ~" + now);
		
		CandleInterval lastValidInteval = new CandleInterval(timePeriod[0], now);
		lastValidInteval.back();
		
		interpolate(symbol, timePeriod[0], lastValidInteval);
	}
	
	/**
	 * 재귀적으로 가장 최근의 Candle을 찾아서 보간함. initial Time보다 큰 범위 내에서 탐색.
	 * @param symbol
	 * @param timePeriod
	 * @param interval
	 * @return
	 */
	public MutableBaseBar interpolate(String symbol, int timePeriod, CandleInterval interval) {
		MutableBaseBar candle = get(symbol, timePeriod, interval);
		//System.out.println("Last Candle: " + candle);
		
		if (candle == null && interval.beginTime().isAfter(initTime)) {
			candle = interpolate(symbol, timePeriod, interval.back());
			offer(symbol, interval.next().beginTime(), candle.getClosePrice(), 0);
			return candle;
		}
		
		return candle;
	}
	
	/**
	 * Broker의 시작시간을 리턴
	 * @return
	 */
	public ZonedDateTime getInitialTime() {
		return this.initTime;
	}
	
	public void test() {
		System.out.println(tempCandleManager.toString());
	}
}

