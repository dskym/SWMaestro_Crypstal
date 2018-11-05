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
import com.crypstal.ta4j.MutableBaseBar;

@Service
public class ChartService {
	
	@Autowired
	private CandleDao candleDao;
	
	public CandleChart getCandles(int unit, String symbol, String from, String to, int count) throws IOException {
		// TODO exchange, market validation check
		// TODO from, to validation check
		// TODO count > 0 check
		
		Map<String, Object> param = new HashMap<>();
		param.put("unit", unit);
		param.put("symbol", symbol);
		param.put("from", from);
		param.put("to", to);
		param.put("count", count);
		
		List<Bar> bars = candleDao.selectList(param);
		System.out.println(bars);
		
		return new CandleChart(bars);
	}
	
	public CandleChart getLatestCandles(String timePeriod, int unit, String symbol, int count) {
		// timePeriod e.g. MONTH, WEEK, DAY, MIN, SEC,
		// TODO check validation
		
		timePeriod = "10SEC";
		
		List<Bar> latestBars = null;
		switch(timePeriod) {
		case "MONTH":
			break;
		case "WEEK":
			break;
		case "DAY":
			break;
		case "3MIN":
			break;
		case "1MIN":
			break;
		case "30SEC":
			break;
		case "10SEC":
			latestBars = candleDao.selectLatestBithumbBTC10SEC(count);
			break;
		default:
		}
		
		if (latestBars == null) {
			System.out.println("null!!!!!!!!!!!!!!!!!!!!!!!!1");
		}
		
		return new CandleChart(latestBars);
	}

}
