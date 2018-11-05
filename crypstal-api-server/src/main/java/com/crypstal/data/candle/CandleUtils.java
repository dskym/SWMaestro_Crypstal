package com.crypstal.data.candle;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class CandleUtils {
	
	/**
	 * time을 timePeriod의 끝 시간으로 변환
	 * @param time
	 * @param timePeriod
	 * @return
	 */
	public static ZonedDateTime toEndTime(ZonedDateTime time, int timePeriod) {
		long current = time.toInstant().toEpochMilli();
		long ceil = ((current / timePeriod) * timePeriod) + timePeriod;
		
		LocalDateTime localTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(ceil), ZoneId.of("Asia/Seoul"));
		return ZonedDateTime.of(localTime, ZoneId.of("Asia/Seoul"));
	}
	
	/**
	 * time을 timePeriod의 시작 시간으로 변환
	 * @param time
	 * @param timePeriod
	 * @return
	 */
	public static ZonedDateTime toBeginTime(ZonedDateTime time, int timePeriod) {
		long current = time.toInstant().toEpochMilli();
		long floor = ((current / timePeriod) * timePeriod);
		
		LocalDateTime localTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(floor), ZoneId.of("Asia/Seoul"));
		return ZonedDateTime.of(localTime, ZoneId.of("Asia/Seoul"));
	}
	
}
