package com.crypstal.api.indicator;

import java.util.Map;

import org.ta4j.core.TimeSeries;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class Indicator {
	
	protected String name;
	
	protected TimeSeries timeSeries;
	
	public abstract boolean isSatisfied(Position p, Object[] args) throws Exception;

}
