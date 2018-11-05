package com.crypstal.tradingbot.order;

import org.springframework.stereotype.Service;

import com.crypstal.api.indicator.Position;

@Service
public class TradingManager {
	
	public Order getOrder(long tradingBotId, Position position) {
		return new BithumbBuyOrder("503fb6ea8d6512afbd235898e73b2677", "e90737365b47b3adf439d2799ef2ab53",
				"BTC", "KRW", 0.1f, 714500, "bid");
	}
	
	public void placeOrder(long tradingBotId, Position position) {
		Order trialOrder = getOrder(tradingBotId, position);
		trialOrder.place();
	}
	
	public void logging() {
		
	}
 	
}
