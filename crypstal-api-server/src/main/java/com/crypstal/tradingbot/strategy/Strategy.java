package com.crypstal.tradingbot.strategy;

import java.util.List;

import com.crypstal.tradingbot.rule.Indicator;
import com.crypstal.tradingbot.rule.Rule;

public abstract class Strategy {
	
	public abstract void addRule(Rule<? extends Indicator> rule);
	
	public abstract List<Rule<? extends Indicator>> getRules();
	
	public abstract int getScoreThreshold();

}
