package com.crypstal.api.backtest;

import java.time.ZonedDateTime;

import org.ta4j.core.Decimal;
import org.ta4j.core.Order;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class BudgetaryOrder extends Order {
	
	private static final long serialVersionUID = -2646973604780665713L;
	
	private Decimal asset;
	
	private ZonedDateTime time;

	protected BudgetaryOrder(int index, ZonedDateTime time, OrderType type, Decimal price, Decimal amount, Decimal asset) {
		super(index, type, price, amount);
		this.time = time;
		this.asset = asset; 
	}

	@Override
	public String toString() {
		return "Order{" + "type=" + getType() + ", index=" + getIndex() + ", time=" + this.time 
				+ ", price=" + getPrice() + ", amount=" + getAmount() + ", asset=" + this.asset + '}';
	}
	
	

}
