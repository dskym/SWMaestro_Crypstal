package com.crypstal.api.model;

import java.time.LocalDateTime;

import lombok.Data;

public @Data class CryptoPrice {
	
	private LocalDateTime timestamp;
	private int open;
	private int close;
	private int high;
	private int low;
	private float volume;
	
	private String date;

}
