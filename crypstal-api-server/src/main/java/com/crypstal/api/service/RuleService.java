package com.crypstal.api.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ta4j.core.Order.OrderType;
import org.ta4j.core.indicators.EMAIndicator;
import org.ta4j.core.indicators.SMAIndicator;
import org.ta4j.core.indicators.WMAIndicator;
import org.ta4j.core.indicators.helpers.ClosePriceIndicator;
import org.ta4j.core.Decimal;
import org.ta4j.core.Indicator;
import org.ta4j.core.Rule;
import org.ta4j.core.TimeSeries;
import org.ta4j.core.trading.rules.CrossedDownIndicatorRule;
import org.ta4j.core.trading.rules.CrossedUpIndicatorRule;

import com.crypstal.api.dao.RuleDao;
import com.crypstal.api.strategy.SignalListener;
import com.crypstal.api.strategy.Strategy;
import com.crypstal.api.strategy.WeightedRule;
import com.google.gson.Gson;

@Service
public class RuleService {
	
	@Autowired
	private RuleDao ruleDao;
	
	public List<Strategy> getById(String ruleId) {
		return null;
	}
	
	public List<String> getSerializedByBot(int botId, OrderType orderType) {
		return ruleDao.selectListByBot(botId, orderType);
	}
	
	/**
	 * @param botId the trading bot's botId
	 * @param series the candle chart the trading bot is watching
	 * @param orderType the {@link OrderType} used to get rules in specific position
	 * @return the weighted rule of the trading bot in specific position
	 */
	public WeightedRule getByBot(int botId, TimeSeries series, OrderType orderType) {
		List<String> serializedEntryRuleList = getSerializedByBot(botId, orderType);
		
		WeightedRule weightedRule = new WeightedRule();
		for (String s : serializedEntryRuleList) {
			Map<String, String> deserialized = deserializeRule(s);
			weightedRule.addRule(buildRule(series, deserialized), Integer.parseInt(deserialized.get("weight")));
		}
		return weightedRule;
	}
	
	
	/**
	 * @param serializedRule the serialized string from the rule 
	 * @return 
	 */
	@SuppressWarnings("unchecked")
	public Map<String, String> deserializeRule(String serializedRule) {
		// TODO check validation
		Gson gson = new Gson();
		return gson.fromJson(serializedRule, Map.class);
	}
	
	public Rule buildRule(TimeSeries timeSeries, Map<String, String> map) {
		String indicator = map.get("indicator");
		
		switch(indicator) {
		case "MADouble" :
			return buildMADoubleIndicatorRule(timeSeries, map);
		}

		return null;
	}
	
	public Rule buildMADoubleIndicatorRule(TimeSeries timeSeries, Map<String, String> map) {
		int shortTerm = Integer.parseInt(map.get("shortTerm"));
		int longTerm = Integer.parseInt(map.get("longTerm"));
		String shortTermMAType = map.get("shortTermMAType");
		String longTermMAType = map.get("longTermMAType");
		String comparator = map.get("comparator");
		
		ClosePriceIndicator indicator = new ClosePriceIndicator(timeSeries);
		Indicator<Decimal> shortTermMA = null;
		switch (shortTermMAType) {
		case "SMA" :
			shortTermMA = new SMAIndicator(indicator, shortTerm);
			break;
		case "EMA" :
			shortTermMA = new EMAIndicator(indicator, shortTerm);
			break;
		case "WMA" :
			shortTermMA = new WMAIndicator(indicator, shortTerm);
			break;
		}
		
		Indicator<Decimal> longTermMA = null;
		switch (longTermMAType) {
		case "SMA" :
			longTermMA = new SMAIndicator(indicator, longTerm);
			break;
		case "EMA" :
			longTermMA = new EMAIndicator(indicator, longTerm);
			break;
		case "WMA" :
			longTermMA = new WMAIndicator(indicator, longTerm);
			break;
		}
		
		if (comparator.equals(">")) {
			return new CrossedUpIndicatorRule(shortTermMA, longTermMA);
		}
		
		return new CrossedDownIndicatorRule(shortTermMA, longTermMA);
	}
	
	public void updateSerializedRule(int botId, List<String> serializedRuleList) {
		
	}

}
