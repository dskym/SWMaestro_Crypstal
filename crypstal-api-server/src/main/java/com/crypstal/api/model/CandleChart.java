package com.crypstal.api.model;

import java.time.LocalDateTime;
import java.util.List;

import org.ta4j.core.Bar;
import org.ta4j.core.BaseTimeSeries;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class CandleChart extends BaseTimeSeries {

	private static final long serialVersionUID = 6023488583642303997L;
	
	private LocalDateTime from;
	
	private LocalDateTime to;
	
	public CandleChart(List<Bar> bars) {
		super("unamed_series", bars);
		
		int lastBarIdx = bars.size(); 
		if (lastBarIdx > 0) {
			this.from = bars.get(0).getEndTime().toLocalDateTime();
			this.to = bars.get(lastBarIdx - 1).getEndTime().toLocalDateTime();
		}
	}
	
}
