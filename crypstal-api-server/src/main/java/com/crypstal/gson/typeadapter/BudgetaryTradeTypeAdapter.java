package com.crypstal.gson.typeadapter;

import java.io.IOException;
import java.time.format.DateTimeFormatter;

import com.crypstal.api.backtest.BudgetaryOrder;
import com.crypstal.api.backtest.BudgetaryTrade;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

public class BudgetaryTradeTypeAdapter extends TypeAdapter<BudgetaryTrade> {

	@Override
	public void write(JsonWriter out, BudgetaryTrade value) throws IOException {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		BudgetaryOrder entry = value.getEntry();
		BudgetaryOrder exit = value.getExit();
		
		out.beginObject();
		
	    out.name("BUY").beginObject();
	    out.name("time").value(formatter.format(entry.getTime()));
	    out.name("price").value(entry.getPrice().doubleValue());
	    out.name("amount").value(entry.getAmount().doubleValue());
	    out.name("asset").value(entry.getAsset().doubleValue());
	    out.endObject();
	    
	    out.name("SELL").beginObject();
	    out.name("time").value(formatter.format(exit.getTime()));
	    out.name("price").value(exit.getPrice().doubleValue());
	    out.name("amount").value(exit.getAmount().doubleValue());
	    out.name("asset").value(exit.getAsset().doubleValue());
	    out.endObject();
	    
	    out.endObject();
	}

	@Override
	public BudgetaryTrade read(JsonReader in) throws IOException {
		// TODO Auto-generated method stub
		return null;
	}

}
