package com.crypstal.tradingbot;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.ta4j.core.TimeSeries;

import com.crypstal.api.indicator.Position;
import com.crypstal.api.strategy.Strategy;
import com.crypstal.api.strategy.WeightedRule;
import com.crypstal.tradingbot.order.Order;
import com.crypstal.tradingbot.order.TradingManager;
import com.crypstal.tradingbot.strategy.StrategyManager;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TradingBot {
	
	
	private String botName;
	private String targetCryptoCurrency;
	private String targetExchangeName;
	private TimeSeries candleChart;
	private WeightedRule entryRule;
	private WeightedRule exitRule;
	private int tradingPeriod;
	private double tradingAsset;
	private boolean signalAlarm;
	private boolean autoTrading;
	private boolean running;
	private LocalDateTime creationTime;
	private LocalDateTime lastStartupTime;
	private LocalDateTime lastShutdownTime;
	
	
	
	public TradingBot(String botName) {
		this.botName = botName;
	}
	
	// Modified on 11.01.2018 by hongmin.
	private Map<Position, Order> orderOnPosition;
	
	private long id;
	
	private Position position;
	
	public Order getOrder(Position position) {
		return orderOnPosition.get(position);
	}
	
//	public void run() {
//		if (strategyManager.getStrategy(this.botId, this.position).isSatisfied()) {
//			System.out.println("RUN");
//			
//			Order order = getOrder(this.position);
//			tradingManager.placeOrder(this, order);
//		}
//	}
//	
	
}
