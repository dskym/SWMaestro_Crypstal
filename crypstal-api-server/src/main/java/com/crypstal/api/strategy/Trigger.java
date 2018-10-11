package com.crypstal.api.strategy;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Trigger {
	private String leftHandSide;
	private String rightHandSide;
	private String comparator;
}
