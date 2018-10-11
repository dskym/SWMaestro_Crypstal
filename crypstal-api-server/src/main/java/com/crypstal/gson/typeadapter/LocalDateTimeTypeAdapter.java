package com.crypstal.gson.typeadapter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

public class LocalDateTimeTypeAdapter extends TypeAdapter<LocalDateTime> {

	@Override
	public void write(JsonWriter out, LocalDateTime value) throws IOException {
		out.value(value.format(DateTimeFormatter.ISO_DATE_TIME));
	}

	@Override
	public LocalDateTime read(JsonReader in) throws IOException {
		// TODO Auto-generated method stub
		return null;
	}

}
