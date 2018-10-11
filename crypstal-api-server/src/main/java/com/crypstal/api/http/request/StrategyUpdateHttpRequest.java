package com.crypstal.api.http.request;

import java.util.List;

import com.crypstal.api.strategy.SignalConfig;

import lombok.Data;

@Data
public class StrategyUpdateHttpRequest {
	private String position;
	private int strategyThreshold;
	private List<SignalConfig> signalConfigList;
}
