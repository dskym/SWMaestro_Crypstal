package com.crypstal.data.candle;

import java.time.ZonedDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Transaction {
	private ZonedDateTime time;
	private double price;
	private double volume;
}
