package com.crypstal.tradingbot;

import java.util.Iterator;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.crypstal.api.indicator.Position;
import com.crypstal.tradingbot.order.TradingManager;
import com.crypstal.tradingbot.strategy.StrategyManager;

@Service
public class TradingBotEnvironment {
	
	@Autowired
	private StrategyManager strategyManager;
	
	@Autowired
	private TradingManager tradingManager;
	
	private LinkedList<TradingBot> runningBots;
	
	public TradingBotEnvironment() {
		runningBots = new LinkedList<>();
		
		TradingBot tradingBot = new TradingBot();
		tradingBot.setId(10001234);
		tradingBot.setPosition(Position.BUY);
		
		runningBots.add(tradingBot);
	}
	
	@Scheduled(fixedDelay=3000)
	public void operate() {
		Iterator<TradingBot> waitingBots = runningBots.iterator();
		
		while(waitingBots.hasNext()) {
			TradingBot tradingBot = waitingBots.next();
			
			long id = tradingBot.getId();
			Position position = tradingBot.getPosition();
			
			if (!strategyManager.isSatisfied(id, position)) {
				continue;
			}
			
			tradingManager.placeOrder(id, position);
		}
	}
}	
