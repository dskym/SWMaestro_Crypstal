package com.crypstal.api.model;

import java.time.LocalDateTime;

import com.crypstal.gson.typeadapter.MarketConditionTypeAdapter;
import com.google.gson.annotations.JsonAdapter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonAdapter(MarketConditionTypeAdapter.class)
public class MarketCondition {
	private String id;
	private LocalDateTime tradeTime;
	private double openingPrice;
	private double highPrice;
	private double lowPrice;
	private double tradePrice;
	private double prevClosingPrice;
	private String change;
	private double changePrice;
	private double changeRate;
	private double signedChangePrice;
	private double signedChangeRate;
	private double tradeVolume;
	private double accTradePrice;
	private double accTradePrice24h;
	private double accTradeVolume;
	private double accTradeVolume24h;
	private double highest52WeekPrice;
	private String highest52weekDate;
	private double lowest52WeekPrice;
	private String lowest52weekDate;
	private long timestamp;
	private String baseCurrency;
	private String cryptoCurrency;
	
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder(baseCurrency).append("-").append(cryptoCurrency);
		return sb.toString();
	}
}
