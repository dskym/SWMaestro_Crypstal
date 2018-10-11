package com.crypstal.api.controller;

import java.time.LocalDateTime;

import com.crypstal.api.backtest.BudgetaryTrade;
import com.crypstal.api.backtest.TradingResult;
import com.crypstal.api.exchange.AbstractExchangeService;
import com.crypstal.api.model.CandleChart;
import com.crypstal.gson.typeadapter.AbstractExchangeTypeAdapter;
import com.crypstal.gson.typeadapter.BudgetaryTradeTypeAdapter;
import com.crypstal.gson.typeadapter.CandleChartTypeAdapter;
import com.crypstal.gson.typeadapter.LocalDateTimeTypeAdapter;
import com.crypstal.gson.typeadapter.TradingResultTypeAdapter;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public abstract class AbstractController {
	
	private GsonBuilder gsonBuilder;
	
	public AbstractController() {
		this.gsonBuilder = new GsonBuilder();
		gsonBuilder.registerTypeAdapter(AbstractExchangeService.class, new AbstractExchangeTypeAdapter());
	    gsonBuilder.registerTypeAdapter(LocalDateTime.class, new LocalDateTimeTypeAdapter());
	    gsonBuilder.registerTypeAdapter(BudgetaryTrade.class, new BudgetaryTradeTypeAdapter());
	    gsonBuilder.registerTypeAdapter(TradingResult.class, new TradingResultTypeAdapter());
	    gsonBuilder.registerTypeAdapter(CandleChart.class, new CandleChartTypeAdapter());
	    gsonBuilder.setPrettyPrinting();
	}
	
	public Gson getGson() {
		return gsonBuilder.create();
	}

}
