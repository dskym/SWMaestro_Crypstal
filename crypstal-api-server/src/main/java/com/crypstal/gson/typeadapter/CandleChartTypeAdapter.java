package com.crypstal.gson.typeadapter;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.ListIterator;

import org.ta4j.core.Bar;
import com.crypstal.api.model.CandleChart;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

public class CandleChartTypeAdapter extends TypeAdapter<CandleChart> {

	@Override
	public void write(JsonWriter out, CandleChart candleChart) throws IOException {
		
		out.beginObject();
		out.name("from").value(candleChart.getFrom().format(DateTimeFormatter.ISO_DATE_TIME));
		out.name("to").value(candleChart.getTo().format(DateTimeFormatter.ISO_DATE_TIME));
		out.name("candles").beginArray();
		
		List<Bar> bars = candleChart.getBarData();
		ListIterator<Bar> iter = bars.listIterator();
		Bar item = null;
		while (iter.hasNext()) {
			item = iter.next();
			out.beginObject().name("open").value(item.getOpenPrice());
			out.name("high").value(item.getMaxPrice());
			out.name("low").value(item.getMinPrice());
			out.name("close").value(item.getClosePrice());
			out.name("volume").value(item.getVolume());
			out.name("time").value(item.getEndTime().toLocalDateTime().format(DateTimeFormatter.ISO_DATE_TIME));
			out.endObject();
		}
	    out.endArray();
	}

	@Override
	public CandleChart read(JsonReader in) throws IOException {
		// TODO Auto-generated method stub
		return null;
	}

}
