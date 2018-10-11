package com.crypstal.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crypstal.api.dao.SignalConfigDao;
import com.crypstal.api.exchange.AbstractExchangeService;
import com.crypstal.api.strategy.MADoubleSignalConfig;
import com.crypstal.api.strategy.MADoubleSignalListener;
import com.crypstal.api.strategy.SignalConfig;
import com.crypstal.api.strategy.SignalListener;
import com.crypstal.api.strategy.Strategy;
import com.crypstal.gson.typeadapter.AbstractExchangeTypeAdapter;
import com.crypstal.gson.typeadapter.LocalDateTimeTypeAdapter;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Service
public class SignalConfigService {

	@Autowired
	private SignalConfigDao signalConfigDao;
	
	private GsonBuilder gsonBuilder;
	
	private Gson gson;
	
	public SignalConfigService() {
		this.gsonBuilder = new GsonBuilder();
		gsonBuilder.registerTypeAdapter(AbstractExchangeService.class, new AbstractExchangeTypeAdapter());
	    gsonBuilder.registerTypeAdapter(LocalDateTime.class, new LocalDateTimeTypeAdapter());
	    gsonBuilder.setPrettyPrinting();
	    this.gson = gsonBuilder.create();
	}
	
	public List<SignalConfig> getSignalConfigList(String strategyId) {
		return signalConfigDao.selectListById(strategyId);
	}
	
	public SignalListener getSignalListener(SignalConfig signalConfig) {
		String indicatorName = signalConfig.getIndicatorName();
		String serialized = signalConfig.getSerialized();
		
		switch(indicatorName) {
		case "MADouble":
			MADoubleSignalConfig maDoubleSignalConfig = gson.fromJson(serialized, MADoubleSignalConfig.class);
			maDoubleSignalConfig.setSignalId(signalConfig.getSignalId());
			maDoubleSignalConfig.setIndicatorName(signalConfig.getIndicatorName());
			maDoubleSignalConfig.setStrength(signalConfig.getStrength());
			maDoubleSignalConfig.setSerialized(signalConfig.getSerialized());
			
			return new MADoubleSignalListener(maDoubleSignalConfig);
		}
		
		return null;
	}
	
	public List<SignalListener> getSignalLisenerList(String strategyId) {
		List<SignalListener> signalListenerList = new ArrayList<>();
		for (SignalConfig sc : getSignalConfigList(strategyId)) {
			signalListenerList.add(getSignalListener(sc));
		}
		
		return signalListenerList;
	}
	
	public Strategy getSellStrategy(int botId) {
		return null;
	}

}
