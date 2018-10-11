package com.crypstal.api.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.crypstal.api.strategy.SignalConfig;

@Repository
public class SignalConfigDao {
	
	public List<SignalConfig> selectListById(String signalId) {
		SignalConfig sc = new SignalConfig();
		sc.setSignalId(signalId);
		sc.setIndicatorName("MADouble");
		sc.setStrength(5);
		sc.setSerialized("{\"shortTerm\":\"20\", \"longTerm\":\"100\", \"comparator\":\"<\", \"strength\":\"5\"}");
		
		List<SignalConfig> l = new ArrayList<>();
		l.add(sc);
		
		return l;
	}

}
