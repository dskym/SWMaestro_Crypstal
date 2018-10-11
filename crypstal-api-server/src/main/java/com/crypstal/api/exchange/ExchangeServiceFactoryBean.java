package com.crypstal.api.exchange;

import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class ExchangeServiceFactoryBean implements FactoryBean<AbstractExchangeService> {
	
	@Autowired
	private UpbitExchangeService upbitExchangeService;
	
	@Autowired
	private CoinoneExchangeService coinoneExchangeService;
	
	private String exchangeName;
	
	public AbstractExchangeService getExchangeService(String exchangeName) throws Exception {
		this.exchangeName = exchangeName;
		return getObject();
	}

	@Override
	public AbstractExchangeService getObject() throws Exception {
		
		if (exchangeName.equals("UPBIT")) {
			return upbitExchangeService;
		}
		
		if (exchangeName.equals("COINONE")) {
			return coinoneExchangeService;
		}
		
		return null;
	}

	@Override
	public Class<?> getObjectType() {
		return AbstractExchangeService.class;
	}

	@Override
	public boolean isSingleton() {
		return true;
	}

}
