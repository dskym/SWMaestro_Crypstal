package com.crypstal.api.backtest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.ta4j.core.Decimal;
import org.ta4j.core.Order.OrderType;
import org.ta4j.core.Strategy;
import org.ta4j.core.TimeSeries;
import org.ta4j.core.TradingRecord;

import lombok.Data;

/**
 * @author hongm
 *
 */
@Data
public class BacktestManager {
	
	/** The logger */
    private final Logger log = LoggerFactory.getLogger(getClass());
	
    /** The managed time series */
	private TimeSeries timeSeries;
	
	public BacktestManager(TimeSeries timeSeries) {
		this.timeSeries = timeSeries;
	}

	public TradingRecord run(Strategy strategy, OrderType orderType, Decimal amount, Decimal asset) {
		int runBeginIndex = timeSeries.getBeginIndex();
        int runEndIndex = timeSeries.getEndIndex();

        log.trace("Running strategy (indexes: {} -> {}): {} (starting with {})", runBeginIndex, runEndIndex, strategy, orderType);
        BudgetaryTradingRecord tradingRecord = new BudgetaryTradingRecord(orderType);
        tradingRecord.setAssetInitial(asset);
        
        BudgetaryOrder prevOrder = null;
        Decimal orderableVirtualAmount = null;
    	Decimal orderableAsset = null;
    	Decimal currentPrice = null;
    	Decimal realAmount = amount;
    	Decimal change = Decimal.valueOf(0);
    	
        for (int i = runBeginIndex; i <= runEndIndex; i++) {
            // For each bar between both indexes...
            if (strategy.shouldOperate(i, tradingRecord)) {

            	currentPrice = timeSeries.getBar(i).getClosePrice();
            	if (prevOrder == null) 
            		orderableAsset = asset;
            	else
            		orderableAsset = prevOrder.getAsset();
            	
            	if (prevOrder == null) {
            		orderableVirtualAmount = orderableVirtualAmount(1000, orderableAsset.plus(change));
            		orderableAsset = Decimal.valueOf(orderableVirtualAmount.intValue() * 1000);
            		change = orderableAsset.minus(orderableAsset);
            		realAmount = Decimal.valueOf(orderableAsset.doubleValue() / currentPrice.doubleValue());
            	} else {
            		orderableAsset = Decimal.valueOf(realAmount.doubleValue() * currentPrice.doubleValue());
            	}
            	
            	System.out.println(realAmount);
            	prevOrder = tradingRecord.operate(i, timeSeries.getBar(i).getEndTime(), currentPrice, realAmount, orderableAsset);
            }
        }

        if (!tradingRecord.isClosed()) {
            // If the last trade is still opened, we search out of the run end index.
            // May works if the end index for this run was inferior to the actual number of bars
        	int seriesMaxSize = Math.max(timeSeries.getEndIndex() + 1, timeSeries.getBarData().size());
            for (int i = runEndIndex + 1; i < seriesMaxSize; i++) {
                // For each bar after the end index of this run...
                // --> Trying to close the last trade
                if (strategy.shouldOperate(i, tradingRecord)) {
                    tradingRecord.operate(i, timeSeries.getBar(i).getEndTime(), timeSeries.getBar(i).getClosePrice(), amount, asset);
                    break;
                }
            }
        }
        
        tradingRecord.setAssetFinal(orderableAsset.plus(change));
        return tradingRecord;
	}
	
	public Decimal orderableVirtualAmount(Number minOrderablePrice, Number asset) {
		if (asset.intValue() < minOrderablePrice.intValue()) {
			return Decimal.valueOf(0);
		}
		
		return Decimal.valueOf(asset.intValue() / minOrderablePrice.intValue());
	}

}
