package com.crypstal.api.strategy;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;


import org.ta4j.core.Rule;
import org.ta4j.core.TradingRecord;
import org.ta4j.core.trading.rules.AbstractRule;

public class WeightedRule extends AbstractRule {
	
	private int weightThreshold;
	
	private Map<Rule, Integer> ruleAndWeight;
	
	public WeightedRule() {
		this(0);
	}
	
	public WeightedRule(int weightThreshold) {
		this.weightThreshold = weightThreshold;
		this.ruleAndWeight = new HashMap<>();
	}
	
	public WeightedRule addRule(Rule rule, int weight) {
		this.ruleAndWeight.put(rule, weight);
		return this;
	}

	@Override
	public boolean isSatisfied(int index, TradingRecord tradingRecord) {
		Set<Rule> rules = ruleAndWeight.keySet();
		Iterator<Rule> iter = rules.iterator();
		
		Rule item = null;
		int weightSum = 0;
		while(iter.hasNext()) {
			item = iter.next();
			if (item.isSatisfied(index, tradingRecord)) {
				weightSum += ruleAndWeight.get(item);
			}
		}
		
		if (weightSum > weightThreshold) {
			return true;
		}
		
		return false;
	}


}
