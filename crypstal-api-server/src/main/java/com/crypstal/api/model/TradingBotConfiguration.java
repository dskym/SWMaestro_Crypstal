package com.crypstal.api.model;

import java.time.LocalDateTime;

import org.ta4j.core.TimeSeries;

import com.crypstal.api.strategy.WeightedRule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TradingBotConfiguration {
	private int id;
	private String name;
	private String crypto;
	private String exchange;
	private int period;
	private double asset;
	private boolean alarm;
	private boolean autoTrading;
}
