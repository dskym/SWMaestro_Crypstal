package com.crypstal.data.candle;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public abstract class CandleProducer<T> {
	
	private GsonBuilder gsonBuilder;
	
	protected Gson gson;
	
	public CandleProducer() {
		gsonBuilder = new GsonBuilder();
		gsonBuilder.setPrettyPrinting();
		gson = gsonBuilder.create();
	}
	
	public abstract void execute();
}
