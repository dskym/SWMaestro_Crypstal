package com.crypstal.api.strategy;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class MADoubleSignalConfig extends SignalConfig {
	private int shortTerm;
	private String shortTermMAType;
	private int longTerm;
	private String longTermMAType;
}
