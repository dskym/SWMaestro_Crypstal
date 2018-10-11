package com.crypstal.api.backtest;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import org.ta4j.core.Decimal;
import org.ta4j.core.Order;
import org.ta4j.core.Order.OrderType;
import org.ta4j.core.Trade;
import org.ta4j.core.TradingRecord;

import lombok.Data;

@Data
public class BudgetaryTradingRecord implements TradingRecord {

	private static final long serialVersionUID = -5693888368346990127L;
	
	/** The recorded orders */
    private List<Order> orders = new ArrayList<Order>();
    
    /** The recorded BUY orders */
    private List<Order> buyOrders = new ArrayList<Order>();
    
    /** The recorded SELL orders */
    private List<Order> sellOrders = new ArrayList<Order>();
    
    /** The recorded entry orders */
    private List<Order> entryOrders = new ArrayList<Order>();
    
    /** The recorded exit orders */
    private List<Order> exitOrders = new ArrayList<Order>();
    
    /** The recorded trades */
    private List<Trade> trades = new ArrayList<Trade>();

    /** The entry type (BUY or SELL) in the trading session */
    private Order.OrderType startingType;
    
    /** The current non-closed trade (there's always one) */
    private BudgetaryTrade currentTrade;
    
    private Decimal assetInitial;
    
    private Decimal assetFinal;
	
	public BudgetaryTradingRecord(Order.OrderType entryOrderType) {
		if (entryOrderType == null) {
            throw new IllegalArgumentException("Starting type must not be null");
        }
        this.startingType = entryOrderType;
        currentTrade = new BudgetaryTrade(entryOrderType);
	}
	
	@Override
	public void operate(int index, Decimal price, Decimal amount) {
		//TODO 채우기
	}

	public BudgetaryOrder operate(int index, ZonedDateTime time, Decimal price, Decimal amount, Decimal asset) {
		if (currentTrade.isClosed()) {
            // Current trade closed, should not occur
            throw new IllegalStateException("Current trade should not be closed");
        }
        boolean newOrderWillBeAnEntry = currentTrade.isNew();
        BudgetaryOrder newOrder = currentTrade.operate(index, time, price, amount, asset);
        recordOrder(newOrder, newOrderWillBeAnEntry);
        
        return newOrder;
	}
	
	/**
     * Records an order and the corresponding trade (if closed).
     * @param order the order to be recorded
     * @param isEntry true if the order is an entry, false otherwise (exit)
     */
    private void recordOrder(Order order, boolean isEntry) {
        if (order == null) {
            throw new IllegalArgumentException("Order should not be null");
        }
        
        // Storing the new order in entries/exits lists
        if (isEntry) {
            entryOrders.add(order);
        } else {
            exitOrders.add(order);
        }
        
        // Storing the new order in orders list
        orders.add(order);
        if (Order.OrderType.BUY.equals(order.getType())) {
            // Storing the new order in buy orders list
            buyOrders.add(order);
        } else if (Order.OrderType.SELL.equals(order.getType())) {
            // Storing the new order in sell orders list
            sellOrders.add(order);
        }

        // Storing the trade if closed
        if (currentTrade.isClosed()) {
            trades.add(currentTrade);
            currentTrade = new BudgetaryTrade(startingType);
        }
    }

	@Override
	public Trade getCurrentTrade() {
		return currentTrade;
	}

	@Override
	public boolean enter(int index, Decimal price, Decimal amount) {
		if (currentTrade.isNew()) {
            operate(index, price, amount);
            return true;
        }
        return false;
	}

	@Override
	public boolean exit(int index, Decimal price, Decimal amount) {
		if (currentTrade.isOpened()) {
            operate(index, price, amount);
            return true;
        }
        return false;
	}

	@Override
	public List<Trade> getTrades() {
		return trades;
	}

	@Override
	public Order getLastOrder() {
		if (!orders.isEmpty()) {
            return orders.get(orders.size() - 1);
        }
        return null;
	}

	@Override
	public Order getLastOrder(OrderType orderType) {
		if (Order.OrderType.BUY.equals(orderType) && !buyOrders.isEmpty()) {
            return buyOrders.get(buyOrders.size() - 1);
        } else if (Order.OrderType.SELL.equals(orderType) && !sellOrders.isEmpty()) {
            return sellOrders.get(sellOrders.size() - 1);
        }
        return null;
	}

	@Override
	public Order getLastEntry() {
		if (!entryOrders.isEmpty()) {
            return entryOrders.get(entryOrders.size() - 1);
        }
        return null;
	}

	@Override
	public Order getLastExit() {
		if (!exitOrders.isEmpty()) {
            return exitOrders.get(exitOrders.size() - 1);
        }
        return null;
	}

	

}
