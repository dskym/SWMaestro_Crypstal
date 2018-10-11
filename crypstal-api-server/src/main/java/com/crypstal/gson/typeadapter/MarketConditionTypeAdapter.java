package com.crypstal.gson.typeadapter;

import java.io.IOException;

import com.crypstal.api.model.MarketCondition;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

public class MarketConditionTypeAdapter extends TypeAdapter<MarketCondition> {

	@Override
	public void write(JsonWriter out, MarketCondition value) throws IOException {
		out.beginObject();
	    out.name("baseCurrency").value(value.getBaseCurrency());
	    out.name("cryptoCurrency").value(value.getCryptoCurrency());
	    out.name("tradePrice").value(value.getTradePrice());
	    out.name("change").value(value.getChange());
	    out.name("signedChangePrice").value(value.getSignedChangePrice());
	    out.name("signedChangeRate").value(value.getSignedChangeRate());
	    out.endObject();
	}

	@Override
	public MarketCondition read(JsonReader in) throws IOException {
		final MarketCondition marketCondition = new MarketCondition();
		
		in.beginObject();
		
		String marketId = null;
		String[] baseAndCrypto = null;
		while (in.hasNext()) {
			switch (in.nextName()) {
			case "market":
				marketId = in.nextString();
				baseAndCrypto = marketId.split("-");
				marketCondition.setId(marketId);
				marketCondition.setBaseCurrency(baseAndCrypto[0]);
				marketCondition.setCryptoCurrency(baseAndCrypto[1]);
				break;
			case "opening_price":
				marketCondition.setOpeningPrice(in.nextDouble());
				break;
			case "trade_price":
				marketCondition.setTradePrice(in.nextDouble());
				break;
			case "change":
				marketCondition.setChange(in.nextString());
				break;
			case "signed_change_price":
				marketCondition.setSignedChangePrice(in.nextDouble());
				break;
			case "signed_change_rate":
				marketCondition.setSignedChangeRate(in.nextDouble());
				break;
			default:
				in.nextString();
			}
		}
		in.endObject();
		
		return marketCondition;
	}

}
