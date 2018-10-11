package com.crypstal.api.backtest;

import lombok.Data;

@Data
public class TradingResult {
	
	private String periodFrom;
	private String periodTo;
	private double assetInitial;
	private double assetFinal;
	private double assetProfit;
	private String cryptoName;
	private double cryptoInitial;
	private double cryptoFinal;
	private double cryptoChange;
	private String exchangeName;
	private double exchangeFee;
	private double exchangeSlippage;
	private int tradingCount;
	private int tradingWin;
	private int tradingLose;
	private double tradingMaxProfit;
	private double tradingMaxLoss;
	private double tradingWinningRate;
	private double tradingReturnRate;
	private double tradingAmountChangeRate;
	

}
