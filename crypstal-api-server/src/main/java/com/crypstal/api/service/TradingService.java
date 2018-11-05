package com.crypstal.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.crypstal.api.model.BaseStrategyTradingBot;
import com.crypstal.tradingbot.TradingBot;

@Service
public class TradingService {
	
	@Autowired
	private BotService botService;

	private List<BaseStrategyTradingBot> runningBotList;
	
	public void register(int botId) throws Exception {
		BaseStrategyTradingBot bot = botService.getById(botId);
		bot.setRunning(true);
		runningBotList.add(bot);
	}
	
	public void remove(int botId) {
		
	}
	
	//@Scheduled(fixedDelay = 10000)
	public void executeTrading() throws Exception {
		
	}
}
