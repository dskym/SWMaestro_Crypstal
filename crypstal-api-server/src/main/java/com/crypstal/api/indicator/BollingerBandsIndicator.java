package com.crypstal.api.indicator;

import org.ta4j.core.Decimal;
import org.ta4j.core.indicators.SMAIndicator;
import org.ta4j.core.indicators.bollinger.BollingerBandWidthIndicator;
import org.ta4j.core.indicators.bollinger.BollingerBandsLowerIndicator;
import org.ta4j.core.indicators.bollinger.BollingerBandsMiddleIndicator;
import org.ta4j.core.indicators.bollinger.BollingerBandsUpperIndicator;
import org.ta4j.core.indicators.helpers.ClosePriceIndicator;
import org.ta4j.core.indicators.statistics.StandardDeviationIndicator;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper=false)
public @Data class BollingerBandsIndicator extends Indicator {
	
	private int defalutSMAPeriod;
	
	private int defaultBandWidthPosition;
	
	@Override
	public boolean isSatisfied(Position p, Object[] args) throws Exception {
		
		int smaPeriod;
		float bandWidthPosition;
		
		if (args == null) {
			smaPeriod = defalutSMAPeriod;
			bandWidthPosition = defaultBandWidthPosition;
		} else {
			smaPeriod = (int)args[0];
			bandWidthPosition = (float)args[1];
		}
		
		ClosePriceIndicator closePrice = new ClosePriceIndicator(timeSeries);
		SMAIndicator sma = new SMAIndicator (closePrice, smaPeriod);
        StandardDeviationIndicator standardDevication = new StandardDeviationIndicator(sma, smaPeriod);

        BollingerBandsMiddleIndicator bbmSMA = new BollingerBandsMiddleIndicator(sma);
        BollingerBandsUpperIndicator bbuSMA = new BollingerBandsUpperIndicator(bbmSMA, standardDevication);
        BollingerBandsLowerIndicator bblSMA = new BollingerBandsLowerIndicator(bbmSMA, standardDevication);
        BollingerBandWidthIndicator bandwidth = new BollingerBandWidthIndicator(bbuSMA, bbmSMA, bblSMA);
        
        int endIndex = timeSeries.getEndIndex();
        
		if (p.equals(Position.BUY)) {
			return closePrice.getValue(endIndex).minus(bblSMA.getValue(endIndex)).dividedBy(bandwidth.getValue(endIndex))
	        		.isGreaterThan(Decimal.valueOf(bandWidthPosition));
		}
		
		return closePrice.getValue(endIndex).minus(bblSMA.getValue(endIndex)).dividedBy(bandwidth.getValue(endIndex))
        		.isLessThan(Decimal.valueOf(bandWidthPosition));
	}

}
