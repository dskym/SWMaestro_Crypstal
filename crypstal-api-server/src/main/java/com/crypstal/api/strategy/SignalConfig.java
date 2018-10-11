package com.crypstal.api.strategy;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Deprecated
public class SignalConfig {
	private String signalId;
	private String indicatorName;
	private String comparator;
	private int strength;
	private String serialized;
}
