package com.crypstal.api.strategy;

import java.util.List;

import org.ta4j.core.TimeSeries;
import lombok.Data;

@Data
public class Strategy {
	
	private String strategyId;
	private String position;
	private List<SignalListener> signalListenerList;
	private int threshold;  
	
	public boolean isSatisfied(TimeSeries timeSeries) throws Exception {
		int totalSingalStrength = 0;
		for (SignalListener signalListener : signalListenerList) {
			signalListener.setTimeSeries(timeSeries);
			
			if (signalListener.isSignal()) {
				totalSingalStrength += signalListener.getStrength();
			}
		}
		
		if (totalSingalStrength > this.threshold) {
			return true;
		}
		
		return false;
	}
}
