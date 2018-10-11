package com.crypstal.api.strategy;

import org.ta4j.core.TimeSeries;

public interface SignalListener {
	public abstract String getSignalId();
	public abstract TimeSeries getTimeSeries();
	public abstract void setTimeSeries(TimeSeries timeSeries);
	public abstract int getStrength();
	public abstract boolean isSignal();
	public abstract SignalConfig getSignalConfig();
}
