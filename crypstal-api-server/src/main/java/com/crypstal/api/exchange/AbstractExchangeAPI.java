package com.crypstal.api.exchange;

import java.time.LocalDateTime;
import java.util.List;

import org.ta4j.core.TimeSeries;

import com.crypstal.api.model.MarketCondition;
import com.crypstal.api.model.Ticker;

public abstract class AbstractExchangeAPI {
	
	/**
	 * 거래소에서에서 거래 가능한 마켓 목록
	 * @return
	 */
	abstract public List<String> getMarketList();
	
	/**
	 * 거래소 시세 현황판 정보.
	 * @return
	 */
	abstract public Ticker getTicker(String base, String crypto);
	
	/**
	 * 코인 별 시세 제공.
	 * @param crpytoCurrenty
	 * @return
	 */
	abstract public MarketCondition getMarketCondition(String market);
	
	abstract public TimeSeries getCandleChart(String market, String unit, LocalDateTime to, int count);

}
