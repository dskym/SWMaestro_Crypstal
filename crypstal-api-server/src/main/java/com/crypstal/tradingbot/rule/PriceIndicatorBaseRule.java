package com.crypstal.tradingbot.rule;

public abstract class PriceIndicatorBaseRule implements Rule<PriceIndicator> {
	
	@Override
	public Class<? extends Indicator> getIndicatorClass() {
		return PriceIndicator.class;
	}
	
}
