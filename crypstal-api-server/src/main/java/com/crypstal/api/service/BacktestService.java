package com.crypstal.api.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.ListIterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ta4j.core.BaseStrategy;
import org.ta4j.core.Decimal;
import org.ta4j.core.Order.OrderType;
import org.ta4j.core.Strategy;
import org.ta4j.core.TimeSeries;
import org.ta4j.core.TimeSeriesManager;
import org.ta4j.core.Trade;
import org.ta4j.core.TradingRecord;

import com.crypstal.api.backtest.BacktestManager;
import com.crypstal.api.backtest.BudgetaryTrade;
import com.crypstal.api.backtest.BudgetaryTradingRecord;
import com.crypstal.api.backtest.TradingResult;
import com.crypstal.api.model.BaseStrategyTradingBot;
import com.crypstal.tradingbot.TradingBot;

@Service
public class BacktestService {
	
	@Autowired
	private BotService botService;
	
	public TradingRecord backtest(BaseStrategyTradingBot bot, String from, String to, Double asset, Double fee, Double slippage) 
			throws Exception {
		
	    //DateTimeFormatter dateTimeFormat = DateTimeFormatter.ISO_DATE;
	    //LocalDateTime date = dateTimeFormat.parse(from, DateTimeFormatter.ISO_DATE);
		
		Strategy myStrategy = new BaseStrategy(bot.getEntryRule(), bot.getExitRule());
		
		TimeSeries series = bot.getCandleChart();
		BacktestManager seriesManager = new BacktestManager(series);
		
		return seriesManager.run(myStrategy, OrderType.BUY, null, Decimal.valueOf(asset));
	}
	
	public TradingResult result(String from, String to, double asset, double fee, double slippage, BaseStrategyTradingBot bot, BudgetaryTradingRecord tradingRecord) {
		
		TradingResult result = new TradingResult();
		result.setPeriodFrom(from);
		result.setPeriodTo(to);
		result.setAssetInitial(tradingRecord.getAssetInitial().doubleValue());
		result.setAssetFinal(tradingRecord.getAssetFinal().doubleValue());
		result.setAssetProfit(tradingRecord.getAssetFinal().doubleValue() - tradingRecord.getAssetInitial().doubleValue());
		result.setCryptoName("BTC");
		result.setCryptoInitial(bot.getCandleChart().getBar(0).getClosePrice().doubleValue());
		result.setCryptoFinal(bot.getCandleChart().getBar(bot.getCandleChart().getEndIndex()).getClosePrice().doubleValue());
		result.setCryptoChange((result.getCryptoFinal() - result.getCryptoInitial()) / result.getAssetInitial());
		result.setExchangeName("UPBIT");
		result.setExchangeFee(fee);
		result.setExchangeSlippage(slippage);
		result.setTradingCount(tradingRecord.getTrades().size());
		
		ListIterator<Trade> iter = tradingRecord.getTrades().listIterator();
		
		BudgetaryTrade item = null;
		int winCount = 0;
		int loseCount = 0;
		double tradingMaxProfit = 0;
		double tradingMaxLoss = 0;
		while(iter.hasNext()) {
			item = (BudgetaryTrade)iter.next();
			if (((BudgetaryTrade)item).winOrLose().equals("WIN")) {
				double tradingProfit = (item.getExit().getAsset().doubleValue() - item.getEntry().getAsset().doubleValue()) / item.getEntry().getAsset().doubleValue();
				if (tradingProfit > tradingMaxProfit) {
					tradingMaxProfit = tradingProfit;
				}
				
				winCount++;
			} else {
				double tradingLoss = ((item.getEntry().getAsset().doubleValue() - item.getExit().getAsset().doubleValue()) / item.getExit().getAsset().doubleValue()) * -1;
				if (tradingLoss < tradingMaxLoss) {
					tradingMaxLoss = tradingLoss;
				}
				
				loseCount++;
			}
		}
		
		result.setTradingWin(winCount);
		result.setTradingLose(loseCount);
		result.setTradingMaxProfit(tradingMaxProfit);
		result.setTradingMaxLoss(tradingMaxLoss);
		result.setTradingWinningRate((winCount / result.getTradingCount()) * 100);
		result.setTradingWinningRate(result.getAssetInitial() / result.getAssetFinal());
		
		return result;
		
	}

}
