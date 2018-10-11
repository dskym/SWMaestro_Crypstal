package com.crypstal.api.model;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticker {
	private String exchange;
	private List<MarketCondition> marketConditionList;
	private LocalDateTime updatedTime;
}
