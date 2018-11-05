package com.crypstal.ta4j;

import java.time.Duration;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import org.ta4j.core.BaseBar;

import com.crypstal.data.candle.CandleInterval;

import lombok.Data;

//MutableBaseBar
@Data
public class MutableBaseBar {
	
	protected ZonedDateTime endTime;
	
	protected ZonedDateTime beginTime;
	
	protected CandleInterval candleInterval;
	
	protected double openPrice;
	
	protected double maxPrice;
	
	protected double minPrice;
	
	protected double closePrice;
	
	protected double volume;
	
	public MutableBaseBar(ZonedDateTime endTime, double openPrice,
			double maxPrice, double minPrice, double closePrice, double volume) {
		super();
		this.endTime = endTime;
		this.openPrice = openPrice;
		this.maxPrice = maxPrice;
		this.minPrice = minPrice;
		this.closePrice = closePrice;
		this.volume = volume;
	}
	
	public MutableBaseBar(CandleInterval candleInterval, double openPrice,
			double maxPrice, double minPrice, double closePrice, double volume) {
		super();
		this.candleInterval = candleInterval;
		this.endTime = candleInterval.endTime();
		this.beginTime = candleInterval.beginTime();
		this.openPrice = openPrice;
		this.maxPrice = maxPrice;
		this.minPrice = minPrice;
		this.closePrice = closePrice;
		this.volume = volume;
	}
	
	@Override
	public String toString() {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("mm:ss");
		
		String beginTimeStr = formatter.format(beginTime);
		String endTimeStr = formatter.format(endTime);
		
		return beginTimeStr + "-" + endTimeStr + ": " + openPrice + "(O), " 
			+ maxPrice + "(H), " + minPrice + "(L), " + closePrice + "(C) ," + volume + "(V)"; 
	}
}
