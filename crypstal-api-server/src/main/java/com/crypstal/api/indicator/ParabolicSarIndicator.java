package com.crypstal.api.indicator;

import org.ta4j.core.Decimal;
import org.ta4j.core.trading.rules.OverIndicatorRule;
import org.ta4j.core.trading.rules.UnderIndicatorRule;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper=false)
public @Data class ParabolicSarIndicator extends Indicator {
	
	private float defaultMinAF;
	
	private float defaultMaxAF;
	
	@Override
	public boolean isSatisfied(Position p, Object[] args) throws Exception {
		
		float minAF, maxAF;
		
		if (args == null) {
			minAF = defaultMinAF;
			maxAF = defaultMaxAF;
		} else {
			minAF = (float)args[0];
			maxAF = (float)args[1];
		}
		
		org.ta4j.core.indicators.ParabolicSarIndicator parabolicSar = 
				new org.ta4j.core.indicators.ParabolicSarIndicator(timeSeries, Decimal.valueOf(minAF), Decimal.valueOf(maxAF));
		
		if (p.equals(Position.BUY)) {
			return new UnderIndicatorRule(parabolicSar, timeSeries.getLastBar().getClosePrice()).isSatisfied(timeSeries.getEndIndex());
		}
		
		return new OverIndicatorRule(parabolicSar, timeSeries.getLastBar().getClosePrice()).isSatisfied(timeSeries.getEndIndex());
	}

}
