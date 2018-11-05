package com.crypstal.tradingbot.rule;

import org.hamcrest.core.IsInstanceOf;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class BiddingRule extends PriceIndicatorBaseRule {
	
	private double bidPrice;
	
	private int weight;
	
	public BiddingRule(double bidPrice, int weight) {
		this.bidPrice = bidPrice;
		this.weight = weight;
	}
	
	@Override
	public boolean isObserved(Indicator indicator) {
		// TODO Auto-generated method stub
		indicator.getValue();
		return true;
	}

	@Override
	public int getWeight() {
		// TODO Auto-generated method stub
		return 1;
	}

}
