package com.crypstal.api.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ta4j.core.Bar;
import org.ta4j.core.BaseTimeSeries;
import org.ta4j.core.TimeSeries;

import com.crypstal.api.dao.CandleDao;
import com.crypstal.api.model.CandleChart;

@Service
public class ChartService {
	
	@Autowired
	private CandleDao candleDao;
	
	public CandleChart getCandles(int unit, String exchange, String market, String from, String to, int count) throws IOException {
		// TODO exchange, market validation check
		// TODO from, to validation check
		// TODO count > 0 check
		
		Map<String, Object> param = new HashMap<>();
		param.put("unit", unit);
		param.put("exchange", exchange);
		param.put("market", market);
		param.put("from", from);
		param.put("to", to);
		param.put("count", count);
		
		List<Bar> bars = candleDao.selectList(param);
		return new CandleChart(bars);
	}
	
	public void download(int unit, String exchange, String market) {
		//Bar lastCandle = candleDao.selectLast();
	}

}
