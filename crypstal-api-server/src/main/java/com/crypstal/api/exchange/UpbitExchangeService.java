package com.crypstal.api.exchange;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.ta4j.core.BaseTimeSeries;
import org.ta4j.core.TimeSeries;

import com.crypstal.api.dao.CandleDao;
import com.crypstal.api.model.Candle;
import com.crypstal.api.model.Ticker;

@Service
public class UpbitExchangeService extends AbstractExchangeService {
	
	@Autowired
	@Qualifier("upbitExchangeAPI")
	private AbstractExchangeAPI exchangeAPI;
	
	@Autowired
	private CandleDao candleDao;
	
	@Override
	public List<Candle> getLatestCandleList(Map<String, Object> param) throws Exception {
		int unit = (Integer)param.get("unit");
		if (unit == 5) {
			param.put("count", 100);
			//return candleDao.selectUpbit5minCandleList(param);
		}
		
		return null;
	}

	@Override
	public Ticker getTicker(String base, String crypto) {
		//TODO null check
		return exchangeAPI.getTicker(base, crypto);
	}

	@Override
	public String getExchangeName() {
		return "UPBIT";
	}

	@Override
	public int placeBuyOrder() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public TimeSeries getCandleChart(String cryptoCurrency) {
		//return exchangeAPI.getCandleChart("KRW-BTC", "DAY", null, 0);
		return exchangeAPI.getCandleChart("KRW-BTC", "5MINUTE", null, 0);
	}
	
	public TimeSeries getCandleChart(LocalDateTime from, LocalDateTime to, String crypto) {
		return exchangeAPI.getCandleChart("KRW-BTC", "DAY", null, 0);
	}
	
	
	
//	@Scheduled(fixedDelay=100000)
//	public void addBar() throws ClassCastException, NullPointerException {
//		Map<String, Object> upbitTicker = getUpbitTicker();
//		
//		Double openPrice = (Double)(upbitTicker.get("opening_price"));
//		Double highPrice = (Double)(upbitTicker.get("high_price"));
//		Double lowPrice = (Double)(upbitTicker.get("low_price"));
//		Double closePrice_ = (Double)(upbitTicker.get("prev_closing_price"));
//		Double volume = (Double)(upbitTicker.get("trade_volume"));
//		
//		timeSeries.addBar(new BaseBar(ZonedDateTime.now(), openPrice, highPrice, lowPrice, closePrice_, volume));
//		
//		System.out.println("[Upbit] Price: " + closePrice_ + ", volume: " + volume);
//	}
	
	

}
