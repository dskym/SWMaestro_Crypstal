package com.crypstal.api.strategy;

import org.ta4j.core.BaseTimeSeries;
import org.ta4j.core.Decimal;
import org.ta4j.core.Indicator;
import org.ta4j.core.TimeSeries;
import org.ta4j.core.indicators.EMAIndicator;
import org.ta4j.core.indicators.MACDIndicator;
import org.ta4j.core.indicators.SMAIndicator;
import org.ta4j.core.indicators.WMAIndicator;
import org.ta4j.core.indicators.helpers.ClosePriceIndicator;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class MADoubleSignalListener extends MACDIndicator implements SignalListener {
	private static final long serialVersionUID = -2125362057684775462L;
	
	private transient Indicator<Decimal> shortTermMA;
	private transient Indicator<Decimal> longTermMA;
	private MADoubleSignalConfig signalConfig;
	private transient TimeSeries timeSeries;
	
	public MADoubleSignalListener(MADoubleSignalConfig signalConfig) {
		super(new ClosePriceIndicator(new BaseTimeSeries()), 0, 1);
		this.signalConfig = signalConfig;
	}
	
	@Override
	public String getSignalId() {
		return signalConfig.getSignalId();
	}

	@Override
	public void setTimeSeries(TimeSeries timeSeries) {
		this.timeSeries = timeSeries;
		ClosePriceIndicator indicator = new ClosePriceIndicator(timeSeries);
		
		switch (signalConfig.getShortTermMAType()) {
		case "SMA" :
			shortTermMA = new SMAIndicator(indicator, signalConfig.getShortTerm());
			break;
		case "EMA" :
			shortTermMA = new EMAIndicator(indicator, signalConfig.getShortTerm());
			break;
		case "WMA" :
			shortTermMA = new WMAIndicator(indicator, signalConfig.getShortTerm());
			break;
		}
		
		switch (signalConfig.getLongTermMAType()) {
		case "SMA" :
			longTermMA = new SMAIndicator(indicator, signalConfig.getLongTerm());
			break;
		case "EMA" :
			longTermMA = new EMAIndicator(indicator, signalConfig.getLongTerm());
			break;
		case "WMA" :
			longTermMA = new WMAIndicator(indicator, signalConfig.getLongTerm());
			break;
		}
	}
	
	@Override
	public TimeSeries getTimeSeries() {
		return this.timeSeries;
	}

	@Override
	public int getStrength() {
		return signalConfig.getStrength();
	}
	
	@Override
	public boolean isSignal() {
		int endIndex = shortTermMA.getTimeSeries().getEndIndex();
		Decimal shortTermMAValue = shortTermMA.getValue(endIndex);
		Decimal longTermMAValue = longTermMA.getValue(endIndex);
		
		if (signalConfig.getComparator().equals(">")) {
			return shortTermMAValue.isGreaterThan(longTermMAValue);
		} 

		return shortTermMAValue.isLessThanOrEqual(longTermMAValue);
	}

}
