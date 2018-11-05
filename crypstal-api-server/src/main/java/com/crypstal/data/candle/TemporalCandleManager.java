package com.crypstal.data.candle;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.crypstal.ta4j.MutableBaseBar;

@Service
public class TemporalCandleManager {
	
	private Map<String, Map<Integer, Map<Long, MutableBaseBar>>> tempCandles;
	
	private String[] symbols = {"bithumbBTC"};
	
	private int[] timePeriod = {10000, 30000, 60000, 180000};
	
	/**
	 * 종목 코드, 캔들차트 주기 별 HashMap 초기화
	 */
	public TemporalCandleManager() {
		tempCandles = new HashMap<>();
		for (int i=0; i<symbols.length; i++) {
			Map<Integer, Map<Long, MutableBaseBar>> candlesBySymbol = new HashMap<>();
			for (int j=0; j<timePeriod.length; j++) {
				candlesBySymbol.put(timePeriod[j], new HashMap<Long, MutableBaseBar>());
			}
			tempCandles.put(symbols[i], candlesBySymbol);
		}
	}
	
	/**
	 * Transaction 데이터를 timePeriod 에 해당하는 Candle 중 endTime이 같은 Candle에 데이터를 생성하거나 업데이트. 
	 * @param symbol
	 * @param timePeriod
	 * @param tr
	 */
	public void add(String symbol, int timePeriod, Transaction tr) {
		Map<Long, MutableBaseBar> millsAndCandle = search(symbol, timePeriod);
		
		CandleInterval candleInterval = new CandleInterval(timePeriod, tr.getTime());
		long milli = candleInterval.beginTime().toInstant().toEpochMilli();
		
		if (!millsAndCandle.containsKey(milli)) {
			double trPrice = tr.getPrice();
			double volume = tr.getVolume();
			
			MutableBaseBar candle = new MutableBaseBar(candleInterval, trPrice, trPrice, trPrice, trPrice, volume);
			millsAndCandle.put(milli, candle);
			return;
		}
		
		MutableBaseBar candleTobeUpdated = millsAndCandle.get(milli);
		update(candleTobeUpdated, tr);
	}
	
	/**
	 * symbol, timePeriod 캔들의 endTime에 해당하는 Candle을 리턴
	 * @param symbol
	 * @param timePeriod
	 * @param time
	 * @return
	 */
	public MutableBaseBar get(String symbol, int timePeriod, CandleInterval candleInterval) {
		Map<Long, MutableBaseBar> millsAndCandle = search(symbol, timePeriod);
		long milli = candleInterval.beginTime().toInstant().toEpochMilli();
		
		return millsAndCandle.get(milli);
	}
	
	/**
	 *  symbol, timePeriod, time에 해당하는 Candle을 제거.
	 * @param symbol
	 * @param timePeriod
	 * @param time
	 */
	public void remove(String symbol, int timePeriod, CandleInterval candleInterval) {
		Map<Long, MutableBaseBar> millsAndCandle = search(symbol, timePeriod);
		long milli = candleInterval.beginTime().toInstant().toEpochMilli();
		
		millsAndCandle.remove(milli);
	}
	
	/**
	 * 오래된 캔들을 제거함으로써 캔들 수를 limit 이하로 제한.
	 * @param limit
	 */
	public void reduce(int limit) {
		Map<Integer, Map<Long, MutableBaseBar>> candlesByTimePeriod = null;
		Map<Long, MutableBaseBar> candlesByBeginTime = null;
		List<Long> orderedBeginTime = null;
		int removeCount = 0;
		
		for (int i=0; i<symbols.length; i++) {
			candlesByTimePeriod = tempCandles.get(symbols[i]);
			for (int j=0; j<timePeriod.length; j++) {
				candlesByBeginTime = candlesByTimePeriod.get(timePeriod[j]);
				orderedBeginTime = new ArrayList<>(candlesByBeginTime.keySet());
				Collections.sort(orderedBeginTime); // 시간 순 정렬
				
				removeCount = (orderedBeginTime.size() > limit) ? orderedBeginTime.size() - limit : 0; 
				for (int k=0; k<removeCount; k++){ // 오래된 순으로 removeCount개수 만큼 제거
					candlesByBeginTime.remove(orderedBeginTime.get(k));
				}
			}
		}
	}
	
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		for (int i=0; i<symbols.length; i++) {
			sb.append("[").append(symbols[i]).append("]\n");
			for (int j=0; j<timePeriod.length; j++) {
				sb.append(timePeriod[j]).append(":\n");
				
				Map<Long, MutableBaseBar> millsAndCandle = search(symbols[i], timePeriod[j]);
				Set<Long> keys = millsAndCandle.keySet();
				
				Iterator<Long> iter = keys.iterator();
				MutableBaseBar candle;
				CandleInterval candleInterval;
				long milli;
				double open, max, min, close, volume;
				while(iter.hasNext()) {
					milli = iter.next();
					candle = millsAndCandle.get(milli);
					candleInterval = candle.getCandleInterval();
					open = candle.getOpenPrice();
					max = candle.getMaxPrice();
					min = candle.getMinPrice();
					close = candle.getClosePrice();
					volume = candle.getVolume();
					
					sb.append(candleInterval).append("\t").append(open).append("(O)\t").append(max).append("(H)\t")
						.append(min).append("(L)\t").append(close).append("(C)\t").append(volume).append("(V)\n");
				}
			}
			sb.append("\n");
		}
		
		return sb.toString();
	}
	
	private void update(MutableBaseBar candle, Transaction tr) {
		double trPrice = tr.getPrice();
		
		if(trPrice > candle.getMaxPrice()) {
			candle.setMaxPrice(trPrice);
		} 
		
		if(trPrice < candle.getMinPrice()) {
			candle.setMinPrice(trPrice);
		}
		
		candle.setClosePrice(trPrice);
		candle.setVolume(candle.getVolume() + tr.getVolume());
	}
	
	
	private Map<Long, MutableBaseBar> search(String symbol, int timePeriod) {
		if (!tempCandles.containsKey(symbol)) {
			return null;
		}
		
		if (!tempCandles.get(symbol).containsKey(timePeriod)) {
			return null;
		}
		
		return tempCandles.get(symbol).get(timePeriod);
	}
	
}
