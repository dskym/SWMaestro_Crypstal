package com.crypstal.api.exchange;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.ta4j.core.TimeSeries;

import com.crypstal.api.model.Candle;
import com.crypstal.api.model.Ticker;

@Service
public abstract class AbstractExchangeService {
	
	protected String exchangeName;

	protected Map<String, TimeSeries> candleChartMap;
	
	/**
	 * 최근 100개의 5min Candle 리스트 리턴.
	 * 
	 * @return
	 */
	public abstract List<Candle> getLatestCandleList(Map<String, Object> param) throws Exception;
	
	public abstract Ticker getTicker(String base, String crypto);
	
	public abstract String getExchangeName();
	
	public abstract TimeSeries getCandleChart(String cryptoCurrency);
	
	public abstract int placeBuyOrder();
}
