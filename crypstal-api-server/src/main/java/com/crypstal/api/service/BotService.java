package com.crypstal.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ta4j.core.Order.OrderType;
import org.ta4j.core.Rule;
import org.ta4j.core.TimeSeries;

import com.crypstal.api.dao.TradingBotConfigurationDao;
import com.crypstal.api.exchange.AbstractExchangeService;
import com.crypstal.api.exchange.ExchangeServiceFactoryBean;
import com.crypstal.api.model.BaseStrategyTradingBot;
import com.crypstal.api.model.Bot;
import com.crypstal.api.model.TradingBotConfiguration;
import com.crypstal.api.strategy.Strategy;
import com.crypstal.api.strategy.WeightedRule;

@Service
public class BotService {

	@Autowired
	private TradingBotConfigurationDao tradingBotConfDao;
	
	@Autowired
	private RuleService ruleService;
	
	@Autowired
	private ExchangeServiceFactoryBean exchangeFactoryBean;
	
	public BaseStrategyTradingBot getById(int botId) throws Exception {
		TradingBotConfiguration conf = tradingBotConfDao.selectById(botId);
		
		AbstractExchangeService exchangeService = exchangeFactoryBean.getExchangeService(conf.getExchange());
		TimeSeries candleChart = exchangeService.getCandleChart(conf.getCrypto()); 
		
		WeightedRule entryRule = ruleService.getByBot(botId, candleChart, OrderType.BUY);
		WeightedRule exitRule = ruleService.getByBot(botId, candleChart, OrderType.SELL);
		
		if (entryRule == null || exitRule == null) {
			System.out.println("null");
		} else {
			System.out.println("not null");
		}
		
		BaseStrategyTradingBot bot = new BaseStrategyTradingBot(conf, entryRule, exitRule, candleChart);
		
		return bot;
	}
	
	public List<TradingBotConfiguration> getByUser() {
		return tradingBotConfDao.selectListByUser();
	}
	
	public void store(Bot bot) {
		//botDao.insert(bot);
	}
	
	public Bot createByDefault(String botName) {
		return new Bot(botName);
	}
}


