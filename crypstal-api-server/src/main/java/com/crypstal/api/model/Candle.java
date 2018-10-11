package com.crypstal.api.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Candle {
	private String market;
	private LocalDateTime candleDateTimeUTC;
	private LocalDateTime candleDateTimeKST;
	private long openingPrice;
	private long highPrice;
	private long lowPrice;
	private long tradePrice;
	private long timestamp;
	private long candleAccTradePrice;
	private long candleAccTradeVolume;
	private int unit;
}
