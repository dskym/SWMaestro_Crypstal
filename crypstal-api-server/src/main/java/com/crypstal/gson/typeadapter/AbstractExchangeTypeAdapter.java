package com.crypstal.gson.typeadapter;

import java.io.IOException;

import com.crypstal.api.exchange.AbstractExchangeService;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

public class AbstractExchangeTypeAdapter extends TypeAdapter<AbstractExchangeService> {

	@Override
	public void write(JsonWriter out, AbstractExchangeService value) throws IOException {
		out.value(value.getExchangeName());
	}

	@Override
	public AbstractExchangeService read(JsonReader in) throws IOException {
		return null;
	}

}
