package com.crypstal.api.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.ta4j.core.Order.OrderType;

import com.crypstal.api.strategy.Strategy;

@Repository
public class RuleDao {
	
	//private String mapperPrefix = "com.crypstal.api.CryptoPriceMapper";
	
	public List<String> selectListByBot(int botId, OrderType orderType) {
		String testRule = "{\"indicator\":\"MADouble\", \"shortTerm\":\"55\", \"longTerm\":\"130\", \"shortTermMAType\":\"SMA\", \"longTermMAType\":\"SMA\", \"comparator\":\">\", \"weight\":\"1\"}";
		
		List<String> ruleList = new ArrayList<>();
		ruleList.add(testRule);
		return ruleList;
	}
	
	public Strategy selectBuyStrategyByBot(int botId) {
		return null;
	}
	
	public Strategy selectSellStrategyByBot(int botId) {
		return null;
	}

}
