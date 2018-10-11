package com.crypstal.api.indicator;

import org.ta4j.core.indicators.SMAIndicator;
import org.ta4j.core.indicators.helpers.ClosePriceIndicator;
import org.ta4j.core.trading.rules.OverIndicatorRule;
import org.ta4j.core.trading.rules.UnderIndicatorRule;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper=false)
public @Data class MADoubleIndicator extends Indicator {
	
	private int defaultShortPeriod;
	
	private int defaultLongPeriod;
	
	@Override
	public boolean isSatisfied(Position p, Object[] args) throws Exception {
		// TODO 에러 처리 할 것.
		int shortPeriod, longPeriod;
		
		if (args == null) {
			shortPeriod = defaultShortPeriod;
			longPeriod = defaultLongPeriod; 
		} else {
			shortPeriod = (int)args[0];
			longPeriod = (int)args[1];
		}
		
		if (shortPeriod < 1 || longPeriod < 1) {
			throw new Exception();
		}
		
		System.out.println(timeSeries.getBarCount());
		
		if (timeSeries.getBarCount() < longPeriod) {
			throw new IndexOutOfBoundsException();
		}
		
		System.out.println(shortPeriod);
		System.out.println(longPeriod);
		System.out.println(timeSeries.getBarCount());
		
		ClosePriceIndicator closePrice = new ClosePriceIndicator(timeSeries);
		SMAIndicator smaShort = new SMAIndicator(closePrice, shortPeriod);
		SMAIndicator smaLong = new SMAIndicator(closePrice, longPeriod);
		
		if (p.equals(Position.BUY)) {
			return new OverIndicatorRule(smaShort, smaLong).isSatisfied(timeSeries.getEndIndex());
		}
		
		return new UnderIndicatorRule(smaShort, smaLong).isSatisfied(timeSeries.getEndIndex());
	}

}
