package com.crypstal.api.backtest;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import org.ta4j.core.Decimal;
import org.ta4j.core.Order;
import org.ta4j.core.Trade;

import lombok.Data;

import org.ta4j.core.Order.OrderType;

@Data
public class BudgetaryTrade extends Trade {

	private static final long serialVersionUID = 6267786667497472866L;
	
	/** The entry order */
    private BudgetaryOrder entry;

    /** The exit order */
    private BudgetaryOrder exit;

    /** The type of the entry order */
    private OrderType startingType;
    
    /**
     * Constructor.
     * @param startingType the starting {@link OrderType order type} of the trade (i.e. type of the entry order)
     */
    public BudgetaryTrade(OrderType startingType) {
        if (startingType == null) {
            throw new IllegalArgumentException("Starting type must not be null");
        }
        this.startingType = startingType;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (obj instanceof BudgetaryTrade) {
        	BudgetaryTrade t = (BudgetaryTrade) obj;
            return entry.equals(t.getEntry()) && exit.equals(t.getExit());
        }
        return false;
    }

    @Override
    public int hashCode() {
        return Objects.hash(entry, exit);
    }

	public BudgetaryOrder operate(int index, ZonedDateTime time, Decimal price, Decimal amount, Decimal asset) {
		BudgetaryOrder order = null;
        if (isNew()) {
        	
            order = new BudgetaryOrder(index, time, startingType, price, amount, asset);
            entry = order;
        } else if (isOpened()) {
            if (index < entry.getIndex()) {
                throw new IllegalStateException("The index i is less than the entryOrder index");
            }
            order = new BudgetaryOrder(index, time, startingType.complementType(), price, amount, asset);
            exit = order;
        }
        return order;
	}
	
	public String winOrLose() {
		if (entry.getPrice().doubleValue() < exit.getPrice().doubleValue()) {
			return "WIN";
		} 
		
		return "LOSE";
	}
	
	/**
     * @return true if the trade is closed, false otherwise
     */
    public boolean isClosed() {
        return (entry != null) && (exit != null);
    }

    /**
     * @return true if the trade is opened, false otherwise
     */
    public boolean isOpened() {
        return (entry != null) && (exit == null);
    }

    /**
     * @return true if the trade is new, false otherwise
     */
    public boolean isNew() {
        return (entry == null) && (exit == null);
    }

    @Override
    public String toString() {
        return "Entry: " + entry + " exit: " + exit;
    }

}
