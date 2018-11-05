package com.crypstal.tradingbot.rule;

public interface Rule<T extends Indicator> {
	
	public abstract boolean isObserved(Indicator indicator);
	
	public abstract Class<? extends Indicator> getIndicatorClass();
	
	public abstract int getWeight();

}
