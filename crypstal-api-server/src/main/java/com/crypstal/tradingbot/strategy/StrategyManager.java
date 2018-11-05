package com.crypstal.tradingbot.strategy;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.crypstal.api.indicator.Position;
import com.crypstal.tradingbot.rule.BiddingRule;
import com.crypstal.tradingbot.rule.Indicator;
import com.crypstal.tradingbot.rule.PriceIndicator;
import com.crypstal.tradingbot.rule.Rule;

@Service
public class StrategyManager {
	
	private Map<Long, Map<Position, Strategy>> strategies = new HashMap<>();
	
	public StrategyManager() {
		//임시 데이터
		BaseStrategy bidPriceSetStrategy = new BaseStrategy();
		bidPriceSetStrategy.addRule(new BiddingRule(7120000, 99));
		
		Map<Position, Strategy> positionAndStrategy = new HashMap<>();
		positionAndStrategy.put(Position.BUY, bidPriceSetStrategy);
		
		strategies.put(new Long(10001234), positionAndStrategy);
	}
	
	public static void main(String[] args) {
		StrategyManager sm = new StrategyManager();
		System.out.println(sm.getStrategy(10001234, Position.BUY));
		
	}
	
	/**
	 * 트레이딩 봇의 id와 position에 맵핑되어 있는 전략을 리턴.
	 * @param tradingBotId
	 * @param position
	 * @return
	 */
	public Strategy getStrategy(long tradingBotId, Position position) {
		return strategies.get(tradingBotId).get(position);
	}
	
	/**
	 * 트레이딩 봇의 id와 position에 맵핑되어 있는 전략이 현재 조건에 적합한지 판단.
	 * @param tradingBotId
	 * @param position
	 * @return
	 */
	public boolean isSatisfied(long tradingBotId, Position position) {
		Strategy strategy = getStrategy(tradingBotId, position);
		
		if(strategy == null) {
			return false;
		}
		
		int scoreThreshold = strategy.getScoreThreshold();
		int currentScore = evaluate(strategy.getRules());
		
		if (currentScore < scoreThreshold) {
			return false;
		}
		
		return true;
	}

	/**
	 * 트레이딩 봇의 전략의 점수를 평가
	 * @param tradingBotId
	 * @param position
	 * @return
	 */
	public int evaluate(long tradingBotId, Position position) {
		Strategy strategy = getStrategy(tradingBotId, position);
		
		if (strategy == null) {
			return -1;
		}
		
		return evaluate(strategy.getRules());
	}
	
	/**
	 * 트레이딩 봇의 전략 점수를 평가
	 * @param rules
	 * @return
	 */
	public int evaluate(List<Rule<?>> rules) {
		int score = 0;
		
		Iterator<Rule<?>> iter = rules.iterator();
		while(iter.hasNext()) {
			Rule<?> rule = iter.next();
			Indicator indicator = getIndicator(rule.getIndicatorClass());
			if(rule.isObserved(indicator)) {
				score += rule.getWeight();
			}
		}
		
		return score;
	}
	
	/**
	 * 타입에 맞는 Indicator 인스턴스를 리턴
	 * @param clazz
	 * @return
	 */
	public Indicator getIndicator(Class<? extends Indicator> clazz) {
		return new PriceIndicator();
	}
	
	
}
