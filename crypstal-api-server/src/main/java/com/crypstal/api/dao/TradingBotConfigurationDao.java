package com.crypstal.api.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.crypstal.api.model.TradingBotConfiguration;
import com.crypstal.tradingbot.TradingBot;

@Repository
public class TradingBotConfigurationDao {
	
	public TradingBotConfiguration selectById(int botId) {
		TradingBotConfiguration conf = new TradingBotConfiguration();
		conf.setExchange("UPBIT");
		conf.setCrypto("BTC");
		
		return conf;
	}
	
	public List<TradingBotConfiguration> selectListByUser() {
		TradingBotConfiguration conf = new TradingBotConfiguration();
		conf.setId(3085);
		conf.setName("승윤봇");
		conf.setExchange("UPBIT");
		conf.setCrypto("BTC");
		conf.setPeriod(5);
		conf.setAsset(1000000);
		
		List<TradingBotConfiguration> confs = new ArrayList<>();
		confs.add(conf);
		
		return confs;
	}

}
