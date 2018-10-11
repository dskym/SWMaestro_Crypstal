package com.crypstal.api.indicator;

import org.ta4j.core.indicators.SMAIndicator;
import org.ta4j.core.indicators.helpers.ClosePriceIndicator;
import org.ta4j.core.trading.rules.OverIndicatorRule;
import org.ta4j.core.trading.rules.UnderIndicatorRule;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper=false)
public @Data class MACDIndicator extends Indicator {
	
	private int defaultShortPeriod;
	
	private int defaultLongPeriod;
	
	private int defualtSignalPeriod;
	
	@Override
	public boolean isSatisfied(Position p, Object[] args) throws Exception {
		
		int shortPeriod, longPeriod, singalPeriod;
		
		if (args == null) {
			shortPeriod = defaultShortPeriod;
			longPeriod = defaultLongPeriod;
			singalPeriod = defualtSignalPeriod;
		} else {
			shortPeriod = (int)args[0];
			longPeriod = (int)args[1];
			singalPeriod = (int)args[2];
		}
		
		if (shortPeriod < 1 || longPeriod < 1 || singalPeriod < 1) {
			throw new Exception();
		}
		
		if (timeSeries.getBarCount() < longPeriod) {
			throw new IndexOutOfBoundsException();
		}
		
		ClosePriceIndicator closePrice = new ClosePriceIndicator(timeSeries);
		org.ta4j.core.indicators.MACDIndicator macdIndicator = 
				new org.ta4j.core.indicators.MACDIndicator(closePrice, shortPeriod, longPeriod);
		SMAIndicator macdSignal = new SMAIndicator(macdIndicator, singalPeriod);

		if (p.equals(Position.BUY)) {
			return new OverIndicatorRule(macdIndicator, macdSignal).isSatisfied(timeSeries.getEndIndex());
		}
		
		return new UnderIndicatorRule(macdIndicator, macdSignal).isSatisfied(timeSeries.getEndIndex());
	}

}
