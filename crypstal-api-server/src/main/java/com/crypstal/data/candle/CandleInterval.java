package com.crypstal.data.candle;

import java.time.Duration;
import java.time.ZonedDateTime;

public class CandleInterval implements Comparable<CandleInterval> {
	
	private Duration timePeriod;

	private ZonedDateTime endTime;
	
	private ZonedDateTime beginTime;
	
	public CandleInterval(int timePeriod, ZonedDateTime time) {
		this.timePeriod = Duration.ofMillis(timePeriod);
		this.endTime = CandleUtils.toEndTime(time, timePeriod);
		this.beginTime = endTime.minus(this.timePeriod);
	}
	
	/**
	 * timePeriod 간격의 현재 endTime 리턴 
	 * @return
	 */
	public ZonedDateTime endTime() {
		return this.endTime;
	}
	
	/**
	 * timePeriod 간격의 현재 beginTime 리턴 
	 * @return
	 */
	public ZonedDateTime beginTime() {
		return this.beginTime;
	}
	
	/**
	 * 현재 가리키는 캔들의 시간을 timePeriod만큼 과거로 되돌림
	 * @return
	 */
	public CandleInterval back() {
		this.endTime = endTime().minus(timePeriod);
		this.beginTime = beginTime().minus(timePeriod);
		return this;
	}
	
	/**
	 * 현재 가리키는 캔들의 시간을 timePeriod만큼 더함.
	 * @return
	 */
	public CandleInterval next() {
		this.endTime = endTime().plus(timePeriod);
		this.beginTime = beginTime().plus(timePeriod);
		return this;
	}
	
	public static void main(String args[]) {
		ZonedDateTime now = ZonedDateTime.now();
		ZonedDateTime bg = CandleUtils.toBeginTime(now, 10000);
		System.out.println(bg);
		
		CandleInterval t = new CandleInterval(10000, bg);
		System.out.println(t.beginTime());
		System.out.println(t.endTime());
	}

	@Override
	public int compareTo(CandleInterval candleInterval) {
		if (this.endTime.isEqual(candleInterval.endTime())) {
			return 0;
		}
		if (this.endTime.isBefore(candleInterval.endTime())) {
			return -1;
		}
		return 1;
	}

	@Override
	public String toString() {
		return "[" + beginTime + " ~ " + endTime + "]";
	}
}
