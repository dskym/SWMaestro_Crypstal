package com.crypstal.api.model;

import java.time.LocalDateTime;

import org.ta4j.core.BaseStrategy;
import org.ta4j.core.TimeSeries;

import com.crypstal.api.strategy.WeightedRule;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class BaseStrategyTradingBot extends BaseStrategy {
	
	private TradingBotConfiguration configuration;
	private TimeSeries candleChart;
	private boolean running;
	private LocalDateTime creationTime;
	private LocalDateTime lastStartupTime;
	private LocalDateTime lastShutdownTime;
	
	public BaseStrategyTradingBot(TradingBotConfiguration conf, WeightedRule entryRule, WeightedRule exitRule, TimeSeries candleChart) {
		super(conf.getName(), entryRule, exitRule);
		this.candleChart = candleChart;
	}

}