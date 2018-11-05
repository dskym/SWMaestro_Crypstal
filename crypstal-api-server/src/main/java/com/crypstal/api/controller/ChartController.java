package com.crypstal.api.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.ta4j.core.TimeSeries;

import com.crypstal.api.model.CandleChart;
import com.crypstal.api.service.ChartService;
import com.crypstal.ta4j.MutableBaseBar;

@Controller
@RequestMapping(path="/v1/chart", produces = "application/json; charset=utf-8")
public class ChartController extends AbstractController {
	
	public static Logger logger = Logger.getLogger(ChartController.class);
	
	@Autowired
	private ChartService chartService;
	
	@GetMapping("/candles/{timePeriod}/{unit}")
	@ResponseBody
	public ResponseEntity<String> candleChart(@PathVariable String timePeriod,
			@PathVariable int unit,
			@RequestParam(value="symbol") String symbol,
			@RequestParam(value="to", required=false) String to,
			@RequestParam(value="from", required=false) String from, 
			@RequestParam(value="count", required=false) int count) throws Exception {
		
		CandleChart candleChart = null;
		if (from == null && to == null) {
			candleChart = chartService.getLatestCandles(timePeriod, unit, symbol, count);
		}
		
		candleChart = chartService.getCandles(unit, symbol, from, to, count);
		System.out.println(candleChart);
		return new ResponseEntity<String>(getGson().toJson(candleChart), HttpStatus.OK);
	}
		
	@PutMapping("/candles/minutes/{unit}")
	@ResponseBody
	public ResponseEntity<String> download(@PathVariable int unit,
			@RequestParam(value="exchange") String exchange,
			@RequestParam(value="market") String market)  throws Exception {

		
		Map<String, Object> json = new HashMap<>();
		json.put("unit", unit);
		
		return new ResponseEntity<String>(getGson().toJson(json), HttpStatus.OK);
	}
}
