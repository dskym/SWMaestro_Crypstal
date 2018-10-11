package com.crypstal.api.model;

import lombok.Data;

public @Data class ChartData {
	
	private int id;
	private String date;
	private int open;
	private int high;
	private int low;
	private int close;
	private float volume;

}
