package com.crypstal.api.model;

import java.time.LocalDateTime;

import org.ta4j.core.TimeSeries;

import com.crypstal.api.strategy.Strategy;
import com.crypstal.api.strategy.WeightedRule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Deprecated
public class Bot {
	
	private String botId;
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
	
	public Bot(String botName) {
		this.botName = botName;
	}
	

}