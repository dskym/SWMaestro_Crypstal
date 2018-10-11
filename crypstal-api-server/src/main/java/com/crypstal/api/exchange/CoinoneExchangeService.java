package com.crypstal.api.exchange;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.ta4j.core.TimeSeries;

import com.crypstal.api.model.Candle;
import com.crypstal.api.model.Ticker;

@Service
public class CoinoneExchangeService extends AbstractExchangeService {

	@Override
	public List<Candle> getLatestCandleList(Map<String, Object> param) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Ticker getTicker(String base, String crypto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getExchangeName() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int placeBuyOrder() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public TimeSeries getCandleChart(String cryptoCurrency) {
		// TODO Auto-generated method stub
		return null;
	}



}
