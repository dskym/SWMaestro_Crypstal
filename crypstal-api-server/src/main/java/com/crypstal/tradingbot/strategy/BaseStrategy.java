package com.crypstal.tradingbot.strategy;

import java.util.ArrayList;
import java.util.List;

import com.crypstal.tradingbot.rule.Indicator;
import com.crypstal.tradingbot.rule.Rule;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class BaseStrategy extends Strategy {

	private int scoreTheshold = 1;
	
	private List<Rule<? extends Indicator>> rules = new ArrayList<>();
	
	
	@Override
	public void addRule(Rule<? extends Indicator> newRule) {
		this.rules.add(newRule);
	}
	
	@Override
	public List<Rule<? extends Indicator>> getRules() {
		return this.rules;
	}
	
	@Override
	public int getScoreThreshold() {
		return this.scoreTheshold;
	}
}
