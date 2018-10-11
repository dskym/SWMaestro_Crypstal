package com.crypstal.gson.typeadapter;

import java.io.IOException;
import com.crypstal.api.backtest.TradingResult;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

public class TradingResultTypeAdapter extends TypeAdapter<TradingResult> {

	@Override
	public void write(JsonWriter out, TradingResult value) throws IOException {
		out.beginObject();
		
	    out.name("period").beginObject();
	    out.name("from").value(value.getPeriodFrom());
	    out.name("to").value(value.getPeriodTo()).endObject();
	    
	    out.name("asset").beginObject();
	    out.name("initial").value(value.getAssetInitial());
	    out.name("final").value(value.getAssetFinal());
	    out.name("profit").value(value.getAssetProfit()).endObject();

	    out.name("crypto").beginObject();
	    out.name("name").value(value.getCryptoName());
	    out.name("initial").value(value.getCryptoInitial());
	    out.name("final").value(value.getCryptoFinal());
	    out.name("change").value(value.getCryptoChange()).endObject();
	    
	    out.name("exchange").beginObject();
	    out.name("name").value(value.getExchangeName());
	    out.name("fee").value(value.getExchangeFee());
	    out.name("slippage").value(value.getExchangeSlippage()).endObject();
	    
	    out.name("trading").beginObject();
	    out.name("count").value(value.getTradingCount());
	    out.name("win").value(value.getTradingWin());
	    out.name("lose").value(value.getTradingLose());
	    out.name("maxProfit").value(value.getTradingMaxProfit());
	    out.name("maxLoss").value(value.getTradingMaxLoss());
	    out.name("winningRate").value(value.getTradingWinningRate());
	    out.name("returnRate").value(value.getTradingReturnRate());
	    out.name("amountChangeRate").value(value.getTradingAmountChangeRate()).endObject();
	    
	    out.endObject();
	}

	@Override
	public TradingResult read(JsonReader in) throws IOException {
		// TODO Auto-generated method stub
		return null;
	}

}
